import * as nodemailer from 'nodemailer';
import { logger } from '../logger';
import { envOptional } from '../env';

interface EmailConfig {
  to: string | string[];
  subject: string;
  body?: string;
  text?: string;
  html?: string | null;
  cc?: string | string[];
  bcc?: string | string[];
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Create transporter based on environment configuration
function createTransporter() {
  const host = envOptional('SMTP_HOST');
  const port = envOptional('SMTP_PORT');
  const secure = envOptional('SMTP_SECURE');
  const user = envOptional('SMTP_USER');
  const pass = envOptional('SMTP_PASS');

  const gmailUser = envOptional('GMAIL_USER');
  const gmailPass = envOptional('GMAIL_APP_PASSWORD');

  // Use custom SMTP if configured
  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: port ? parseInt(port) : 587,
      secure: secure === 'true',
      auth: { user, pass },
    });
  }

  // Use Gmail if configured
  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  }

  // Nothing configured
  throw new Error(
    'Email configuration missing. Please set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file.'
  );
}

// Send email using Nodemailer
export async function sendEmail(config: EmailConfig): Promise<EmailResult> {
  try {
    const transporter = createTransporter();

    const fromAddress =
      envOptional('EMAIL_FROM') ||
      envOptional('GMAIL_USER') ||
      envOptional('SMTP_USER');

    const mailOptions = {
      from: fromAddress,
      to: config.to,
      subject: config.subject,
      text: config.text || config.body || config.subject,
      html: config.html || undefined,
      cc: config.cc,
      bcc: config.bcc,
    };

    const info = await transporter.sendMail(mailOptions);

    logger.info('email_sent_success', {
      messageId: info.messageId,
      to: config.to,
      subject: config.subject,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('email_send_failed', {
      to: config.to,
      subject: config.subject,
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('email_config_verified', { message: 'Email configuration is valid' });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('email_config_verification_failed', { error: errorMessage });
    return false;
  }
}

// Parse email action from agent step config
export function parseEmailAction(config: any): EmailConfig {
  const to = config.to || config.recipient || config.email;
  const subject = config.subject || 'AgentForge Notification';
  const text = config.text || config.body || config.message;
  const html = config.html || null;
  const cc = config.cc;
  const bcc = config.bcc;

  if (!to) {
    throw new Error('Email recipient (to) is required');
  }

  return {
    to,
    subject,
    text,
    html,
    cc,
    bcc,
  };
}