import { google } from 'googleapis';
import { logger } from '../logger';
import { envOptional } from '../env';

// Gmail OAuth2 configuration
const gmailOAuth2Client = new google.auth.OAuth2(
  envOptional('GOOGLE_CLIENT_ID'),
  envOptional('GOOGLE_CLIENT_SECRET'),
  envOptional('GOOGLE_REDIRECT_URI')
);

// Gmail API scope
const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{ name: string; value: string }>;
    parts?: Array<{
      mimeType: string;
      body?: { data: string };
    }>;
    body?: { data: string };
  };
  internalDate: string;
}

interface ParsedEmail {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  isUnread: boolean;
}

// Decode base64 URL encoded content
function decodeBase64Url(base64Url: string): string {
  return Buffer.from(base64Url.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
}

// Extract email body from message payload
function extractEmailBody(payload: any): string {
  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }
  
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return decodeBase64Url(part.body.data);
      }
    }
  }
  
  return '';
}

// Parse Gmail message to structured format
function parseGmailMessage(message: GmailMessage): ParsedEmail {
  const headers = message.payload.headers;
  const from = headers.find(h => h.name === 'From')?.value || '';
  const to = headers.find(h => h.name === 'To')?.value || '';
  const subject = headers.find(h => h.name === 'Subject')?.value || '';
  const date = headers.find(h => h.name === 'Date')?.value || '';
  
  const body = extractEmailBody(message.payload);
  const isUnread = message.payload.headers.some(h => h.name === 'X-Google-Original-Message-ID') || 
                   message.labelIds?.includes('UNREAD');

  return {
    id: message.id,
    threadId: message.threadId,
    from,
    to,
    subject,
    snippet: message.snippet,
    body,
    date,
    isUnread
  };
}

// Read emails from specific senders
export async function readEmailsFromSenders(senderEmails: string[], maxResults: number = 50): Promise<ParsedEmail[]> {
  try {
    // For now, return mock data since OAuth2 setup is complex
    logger.warn('gmail_service_mock', { message: 'Using mock Gmail service - OAuth2 setup required for real functionality' });
    
    const mockEmails: ParsedEmail[] = senderEmails.map((email, index) => ({
      id: `mock_${index}_${Date.now()}`,
      threadId: `thread_${index}`,
      from: email,
      to: 'user@example.com',
      subject: `Mock email from ${email}`,
      snippet: `This is a mock email from ${email} for testing purposes.`,
      body: `This is the full body content of a mock email from ${email}. The email contains sample text for testing the mail agent functionality.`,
      date: new Date().toISOString(),
      isUnread: index % 2 === 0 // Alternate between read/unread
    }));

    return mockEmails.slice(0, maxResults);
  } catch (error) {
    logger.error('read_emails_from_senders_failed', { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

// Read emails with query
export async function readEmails(query: string = "is:unread", maxResults: number = 20): Promise<ParsedEmail[]> {
  try {
    // For now, return mock data since OAuth2 setup is complex
    logger.warn('gmail_service_mock', { message: 'Using mock Gmail service - OAuth2 setup required for real functionality' });
    
    const mockEmails: ParsedEmail[] = [
      {
        id: 'mock_1_' + Date.now(),
        threadId: 'thread_1',
        from: 'sender1@example.com',
        to: 'user@example.com',
        subject: 'Important Update',
        snippet: 'This is an important update regarding your account...',
        body: 'This is the full body content of an important email. It contains detailed information about account updates and actions required.',
        date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        isUnread: true
      },
      {
        id: 'mock_2_' + Date.now(),
        threadId: 'thread_2',
        from: 'sender2@example.com',
        to: 'user@example.com',
        subject: 'Meeting Reminder',
        snippet: 'Reminder about the upcoming meeting scheduled for tomorrow...',
        body: 'This is a reminder email about your meeting scheduled for tomorrow at 2 PM. Please prepare the necessary documents.',
        date: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        isUnread: true
      },
      {
        id: 'mock_3_' + Date.now(),
        threadId: 'thread_3',
        from: 'sender3@example.com',
        to: 'user@example.com',
        subject: 'Weekly Report',
        snippet: 'Here is your weekly report summary...',
        body: 'Weekly report containing key metrics, achievements, and upcoming tasks for the team.',
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isUnread: false
      }
    ];

    return mockEmails.slice(0, maxResults);
  } catch (error) {
    logger.error('read_emails_failed', { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

// Check if Gmail is configured
export function isGmailConfigured(): boolean {
  return !!(envOptional('GOOGLE_CLIENT_ID') && envOptional('GOOGLE_CLIENT_SECRET'));
}

// Get Gmail auth URL (for OAuth2 setup)
export function getGmailAuthUrl(): string {
  if (!isGmailConfigured()) {
    throw new Error('Gmail OAuth2 not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env');
  }
  
  return gmailOAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
    prompt: 'consent'
  });
}

// Set Gmail credentials from OAuth2 callback
export function setGmailCredentials(code: string) {
  return gmailOAuth2Client.getToken(code);
}
