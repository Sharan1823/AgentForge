import { logger } from '../logger';
import { envOptional } from '../env';
import { prisma } from '../db/prisma';

export interface LinkedInProfile {
  sub: string; // person ID
  name: string;
  email: string;
}

export interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

export interface LinkedInPostResponse {
  id: string;
  publishedAt?: string;
}

class LinkedInService {
  private clientId: string | undefined;
  private clientSecret: string | undefined;
  private redirectUri: string | undefined;

  constructor() {
    this.clientId = envOptional('LINKEDIN_CLIENT_ID');
    this.clientSecret = envOptional('LINKEDIN_CLIENT_SECRET');
    this.redirectUri = envOptional('LINKEDIN_REDIRECT_URI');

    if (!this.clientId || !this.clientSecret || !this.redirectUri) {
      logger.warn('linkedin_config_missing', { 
        message: 'LinkedIn environment variables not found' 
      });
    }
  }

  getLinkedInAuthUrl(userId: string): string {
    if (!this.clientId || !this.redirectUri) {
      throw new Error('LinkedIn client ID or redirect URI not configured');
    }

    const state = Buffer.from(JSON.stringify({ userId })).toString('base64');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'openid profile email w_member_social',
      state
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<LinkedInTokenResponse> {
    if (!this.clientId || !this.clientSecret || !this.redirectUri) {
      throw new Error('LinkedIn configuration missing');
    }

    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`LinkedIn token exchange failed: ${response.status} - ${errorText}`);
      }

      const data: any = await response.json();
      
      // Calculate expiry date
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + data.expires_in);

      logger.info('linkedin_token_exchanged', { 
        expiresIn: data.expires_in,
        expiresAt: expiresAt.toISOString()
      });

      return {
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token
      };
    } catch (error) {
      logger.error('linkedin_token_exchange_failed', { 
        error: error instanceof Error ? error.message : String(error) 
      });
      throw error;
    }
  }

  async getLinkedInProfile(accessToken: string): Promise<LinkedInProfile> {
    try {
      const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('LinkedIn access token expired');
        }
        throw new Error(`LinkedIn profile fetch failed: ${response.status}`);
      }

      const data: any = await response.json();
      
      logger.info('linkedin_profile_retrieved', { 
        personId: data.sub,
        name: data.name,
        email: data.email
      });

      return {
        sub: data.sub,
        name: data.name,
        email: data.email
      };
    } catch (error) {
      logger.error('linkedin_profile_failed', { 
        error: error instanceof Error ? error.message : String(error) 
      });
      throw error;
    }
  }

  async publishLinkedInPost(accessToken: string, personId: string, content: string): Promise<string> {
    try {
      // LinkedIn has a 3000 character limit for posts
      const truncatedContent = content.length > 3000 ? content.substring(0, 2997) + '...' : content;

      const requestBody = {
        author: `urn:li:person:${personId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: truncatedContent },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };

      const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        if (response.status === 401) {
          throw new Error('LinkedIn access token expired');
        } else if (response.status === 422) {
          throw new Error('LinkedIn content validation failed - may be too long');
        } else if (response.status === 429) {
          throw new Error('LinkedIn rate limit exceeded');
        } else {
          throw new Error(`LinkedIn publish failed: ${response.status} - ${errorText}`);
        }
      }

      const postId = response.headers.get('x-restli-id');
      if (!postId) {
        throw new Error('LinkedIn did not return post ID');
      }

      logger.info('linkedin_post_published', { 
        postId,
        personId,
        contentLength: content.length,
        truncated: content.length > 3000
      });

      return postId;
    } catch (error) {
      logger.error('linkedin_publish_failed', { 
        error: error instanceof Error ? error.message : String(error),
        personId,
        contentLength: content.length
      });
      throw error;
    }
  }

  async scheduleLinkedInPublish(content: string, scheduledAt: Date, userId: string): Promise<LinkedInPostResponse> {
    try {
      // Get LinkedIn token from database
      const tokenRecord = await prisma.linkedInToken.findUnique({
        where: { userId }
      });

      if (!tokenRecord) {
        throw new Error('LinkedIn not connected for this user');
      }

      // Check if token is expired
      if (new Date() > tokenRecord.expiresAt) {
        throw new Error('LinkedIn access token expired');
      }

      const delay = scheduledAt.getTime() - Date.now();

      if (delay <= 0) {
        // Publish immediately
        const postId = await this.publishLinkedInPost(
          tokenRecord.accessToken, 
          tokenRecord.personId || '', 
          content
        );

        return {
          id: postId,
          publishedAt: new Date().toISOString()
        };
      } else {
        // Schedule for later
        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              // Refresh token record to ensure it's still valid
              const freshToken = await prisma.linkedInToken.findUnique({
                where: { userId }
              });

              if (!freshToken || new Date() > freshToken.expiresAt) {
                reject(new Error('LinkedIn token expired before scheduled publish'));
                return;
              }

              const postId = await this.publishLinkedInPost(
                freshToken.accessToken,
                freshToken.personId || '',
                content
              );

              resolve({
                id: postId,
                publishedAt: new Date().toISOString()
              });
            } catch (error) {
              reject(error);
            }
          }, delay);
        });
      }
    } catch (error) {
      logger.error('linkedin_schedule_failed', { 
        error: error instanceof Error ? error.message : String(error),
        userId,
        scheduledAt: scheduledAt.toISOString()
      });
      throw error;
    }
  }

  async saveLinkedInToken(userId: string, tokenData: LinkedInTokenResponse, profile: LinkedInProfile): Promise<void> {
    try {
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);

      await prisma.linkedInToken.upsert({
        where: { userId },
        update: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: expiresAt,
          personId: profile.sub,
          updatedAt: new Date()
        },
        create: {
          userId: userId,
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: expiresAt,
          personId: profile.sub
        }
      });

      logger.info('linkedin_token_saved', { 
        userId,
        personId: profile.sub,
        expiresAt: expiresAt.toISOString()
      });
    } catch (error) {
      logger.error('linkedin_token_save_failed', { 
        error: error instanceof Error ? error.message : String(error),
        userId
      });
      throw error;
    }
  }

  async isLinkedInConnected(userId: string): Promise<boolean> {
    try {
      const token = await prisma.linkedInToken.findUnique({
        where: { userId }
      });

      if (!token) return false;

      // Check if token is expired
      return new Date() <= token.expiresAt;
    } catch (error) {
      logger.error('linkedin_connection_check_failed', { 
        error: error instanceof Error ? error.message : String(error),
        userId
      });
      return false;
    }
  }

  async getLinkedInStatus(userId: string): Promise<{ connected: boolean; name?: string }> {
    try {
      const token = await prisma.linkedInToken.findUnique({
        where: { userId }
      });

      if (!token || new Date() > token.expiresAt) {
        return { connected: false };
      }

      // Try to get profile to verify token is still valid
      try {
        const profile = await this.getLinkedInProfile(token.accessToken);
        return { 
          connected: true, 
          name: profile.name 
        };
      } catch (error) {
        // Token might be expired, mark as disconnected
        return { connected: false };
      }
    } catch (error) {
      logger.error('linkedin_status_check_failed', { 
        error: error instanceof Error ? error.message : String(error),
        userId
      });
      return { connected: false };
    }
  }

  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret && this.redirectUri);
  }
}

export const linkedinService = new LinkedInService();
