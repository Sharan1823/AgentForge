import axios from 'axios';
import { logger } from '../logger';
import { envOptional } from '../env';

export interface BufferProfile {
  id: string;
  service: string;
  service_username: string;
  service_type: string;
  avatar: string;
  formatted_service_username: string;
  formatted_username: string;
  id_str: string;
  isdefault: boolean;
  statistics: {
    followers: number;
    following: number;
    listed: number;
    posts: number;
    klout: number;
  };
  team_members: string[];
  timezone: string;
  utc_offset: string;
}

export interface BufferUpdateResponse {
  success: boolean;
  buffer_id?: string;
  updates?: Array<{
    id: string;
    text: string;
    due_at: string;
    profile_id: string;
    service: string;
  }>;
  error?: string;
}

export interface ScheduledPost {
  platform: string;
  caption: string;
  scheduledTime: Date;
  humanReadableTime: string;
  bufferId?: string;
}

class BufferService {
  private accessToken: string | undefined;
  private baseURL = 'https://api.bufferapp.com/1';

  constructor() {
    this.accessToken = envOptional('BUFFER_ACCESS_TOKEN');
    if (!this.accessToken) {
      logger.warn('buffer_access_token_missing', { message: 'BUFFER_ACCESS_TOKEN not found in environment variables' });
    }
  }

  async getBufferProfiles(): Promise<BufferProfile[]> {
    if (!this.accessToken) {
      throw new Error('Buffer access token not configured');
    }

    try {
      const response = await axios.get(`${this.baseURL}/profiles.json`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data && Array.isArray(response.data)) {
        logger.info('buffer_profiles_retrieved', { count: response.data.length });
        return response.data;
      } else {
        throw new Error('Invalid response format from Buffer API');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('buffer_profiles_failed', { error: errorMessage });
      throw new Error(`Failed to fetch Buffer profiles: ${errorMessage}`);
    }
  }

  async scheduleBufferPost(profileId: string, text: string, scheduledAt: Date): Promise<BufferUpdateResponse> {
    if (!this.accessToken) {
      throw new Error('Buffer access token not configured');
    }

    try {
      const payload = {
        profile_ids: [profileId],
        text: text.trim(),
        due_at: scheduledAt.toISOString(),
        now: false
      };

      const response = await axios.post(`${this.baseURL}/updates/create.json`, payload, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data && response.data.success) {
        logger.info('buffer_post_scheduled', { 
          profileId, 
          bufferId: response.data.updates?.[0]?.id,
          scheduledAt: scheduledAt.toISOString()
        });
        return response.data;
      } else {
        throw new Error(response.data?.error || 'Failed to schedule Buffer post');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('buffer_schedule_failed', { 
        error: errorMessage, 
        profileId, 
        scheduledAt: scheduledAt.toISOString() 
      });
      throw new Error(`Failed to schedule Buffer post: ${errorMessage}`);
    }
  }

  mapPlatformToProfile(profiles: BufferProfile[], platform: string): BufferProfile | null {
    const platformMap: Record<string, string> = {
      'INSTAGRAM': 'instagram',
      'LINKEDIN': 'linkedin', 
      'TWITTER': 'twitter',
      'FACEBOOK': 'facebook'
    };

    const bufferService = platformMap[platform.toUpperCase()];
    if (!bufferService) {
      logger.warn('buffer_unsupported_platform', { platform });
      return null;
    }

    const profile = profiles.find(p => p.service === bufferService);
    if (!profile) {
      logger.warn('buffer_no_profile_found', { platform, bufferService });
      return null;
    }

    logger.info('buffer_profile_matched', { 
      platform, 
      bufferService, 
      profileId: profile.id,
      username: profile.service_username 
    });

    return profile;
  }

  isConfigured(): boolean {
    return !!this.accessToken;
  }
}

export const bufferService = new BufferService();
