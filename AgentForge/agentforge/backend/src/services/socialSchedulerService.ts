import { prisma } from '../db/prisma';
import { logger } from '../logger';
import path from 'path';
import fs from 'fs';

export interface ScheduledPost {
  platform: string;
  content: string;
  caption: string;
  scheduledTime: Date;
  status: 'PENDING' | 'PUBLISHED' | 'FAILED';
  hashtags: string[];
}

// Parse posts from CSV text
export function parsePostsFromText(text: string): any[] {
  const posts: any[] = [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    if (
      line.toLowerCase().startsWith('platform') ||
      line.startsWith('#') ||
      line.startsWith('---')
    ) continue;

    const parts = line.split(',').map(p => p.trim());
    if (parts.length >= 4) {
      posts.push({
        platform: parts[0]?.toUpperCase() || 'INSTAGRAM',
        topic: parts[1] || '',
        content: parts[2] || '',
        scheduledTime: parts[3] || '',
        status: parts[4]?.toUpperCase() || 'PENDING',
      });
    }
  }
  return posts;
}

// Get optimal posting time for each platform
export function getOptimalTime(platform: string, date: Date = new Date()): Date {
  const optimal: Record<string, number> = {
    INSTAGRAM: 9,
    FACEBOOK: 9,
    LINKEDIN: 8,
    TWITTER: 12,
    TIKTOK: 19,
  };

  const hour = optimal[platform.toUpperCase()] || 9;
  const postDate = new Date(date);
  postDate.setHours(hour, 0, 0, 0);

  // If time already passed today, schedule for tomorrow
  if (postDate < new Date()) {
    postDate.setDate(postDate.getDate() + 1);
  }

  return postDate;
}

// Generate hashtags based on platform and content
export function generateHashtagSuggestions(
  platform: string,
  content: string
): string[] {
  const base = ['#AI', '#automation', '#business', '#productivity'];
  const platformTags: Record<string, string[]> = {
    INSTAGRAM: ['#instagood', '#viral', '#trending', '#reels'],
    LINKEDIN: ['#innovation', '#leadership', '#tech', '#futureofwork'],
    TWITTER: ['#tech', '#startup', '#ai'],
    FACEBOOK: ['#community', '#news', '#update'],
  };
  return [...base, ...(platformTags[platform.toUpperCase()] || [])];
}

// Save scheduled posts report
export function saveScheduleReport(
  posts: any[],
  agentName: string
): string {
  const reportsDir = path.join(__dirname, '../../uploads/reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const filename = `schedule_report_${Date.now()}.json`;
  const outputPath = path.join(reportsDir, filename);

  const report = {
    agentName,
    generatedAt: new Date().toISOString(),
    totalPosts: posts.length,
    posts,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  logger.info('schedule_report_saved', { outputPath, postCount: posts.length });
  return filename;
}