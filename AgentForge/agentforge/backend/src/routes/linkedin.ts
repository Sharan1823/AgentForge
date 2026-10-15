import express from 'express';
import { linkedinService } from '../services/linkedinService';
import { auth } from '../middleware/auth';
import { logger } from '../logger';

const router = express.Router();

// GET /api/linkedin/auth - Get OAuth URL
router.get('/auth', auth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId || typeof userId !== 'string') {
      return res.status(401).json({ error: 'UNAUTHENTICATED' });
    }
    const authUrl = linkedinService.getLinkedInAuthUrl(userId);
    res.json({ authUrl });
  } catch (error) {
    logger.error('linkedin_auth_url_failed', { 
      error: error instanceof Error ? error.message : String(error),
      userId: (req as any).user?.id 
    });
    res.status(500).json({ error: 'Failed to generate LinkedIn auth URL' });
  }
});

// GET /api/linkedin/callback - Handle OAuth callback
router.get('/callback', async (req, res) => {
  try {
    const { code, error, state } = req.query;

    if (error) {
      logger.error('linkedin_oauth_error', { error });
      return res.redirect('http://localhost:5173/agents?linkedin=error');
    }

    if (!code || typeof code !== 'string') {
      logger.error('linkedin_oauth_no_code', { query: req.query });
      return res.redirect('http://localhost:5173/agents?linkedin=error');
    }

    let userId = 'unknown';
    try {
      if (state && typeof state === 'string') {
        const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
        userId = decoded.userId;
      }
    } catch {
      logger.error('linkedin_state_decode_failed', { state });
      return res.redirect('http://localhost:5173/agents?linkedin=error');
    }

    if (!userId || typeof userId !== 'string' || userId === 'unknown') {
      logger.error('linkedin_state_missing_user', { state });
      return res.redirect('http://localhost:5173/agents?linkedin=error');
    }

    // Exchange code for token
    const tokenData = await linkedinService.exchangeCodeForToken(code);
    
    // Get LinkedIn profile
    const profile = await linkedinService.getLinkedInProfile(tokenData.access_token);
    
    // Save token to database
    await linkedinService.saveLinkedInToken(userId, tokenData, profile);
    
    logger.info('linkedin_oauth_success', { 
      userId, 
      personId: profile.sub,
      name: profile.name 
    });

    res.redirect('http://localhost:5173/agents?linkedin=connected');
  } catch (error) {
    logger.error('linkedin_callback_failed', { 
      error: error instanceof Error ? error.message : String(error),
      query: req.query 
    });
    res.redirect('http://localhost:5173/agents?linkedin=error');
  }
});

// GET /api/linkedin/status - Check connection status
router.get('/status', auth, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const status = await linkedinService.getLinkedInStatus(userId);
    res.json(status);
  } catch (error) {
    logger.error('linkedin_status_failed', { 
      error: error instanceof Error ? error.message : String(error),
      userId: (req as any).user?.id 
    });
    res.status(500).json({ connected: false });
  }
});

// POST /api/linkedin/publish - Schedule/publish a post
router.post('/publish', auth, async (req, res) => {
  try {
    const { content, scheduledAt } = req.body;
    const userId = (req as any).user.id;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const scheduledTime = scheduledAt ? new Date(scheduledAt) : new Date();
    
    const result = await linkedinService.scheduleLinkedInPublish(
      content, 
      scheduledTime, 
      userId
    );

    logger.info('linkedin_post_scheduled', { 
      userId,
      postId: result.id,
      scheduledAt: result.publishedAt 
    });

    res.json({ 
      success: true, 
      scheduledAt: result.publishedAt,
      postId: result.id 
    });
  } catch (error) {
    logger.error('linkedin_publish_api_failed', { 
      error: error instanceof Error ? error.message : String(error),
      userId: (req as any).user?.id,
      body: req.body 
    });

    if (error instanceof Error && error.message.includes('LinkedIn not connected')) {
      return res.status(401).json({ 
        error: 'LinkedIn not connected. Please connect your account first.' 
      });
    }

    if (error instanceof Error && error.message.includes('expired')) {
      return res.status(401).json({ 
        error: 'LinkedIn access token expired. Please reconnect your account.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to publish LinkedIn post' 
    });
  }
});

export default router;
