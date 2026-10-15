import { Router } from 'express';
import { auth } from '../middleware/auth';
import { logger } from '../logger';
import { envOptional } from '../env';

const router = Router();

const OLLAMA_URL = envOptional('OLLAMA_BASE_URL') || 'http://localhost:11434';
const MODEL = envOptional('OLLAMA_MODEL') || 'deepseek-r1:7b';

async function detectDepartmentAndIntent(messages: any[]): Promise<{
  department: string | null;
  intent: string | null;
  agentDescription: string | null;
  confidence: number;
}> {
  const conversationText = messages.map(m => m.content).join('\n');
  
  const systemPrompt = `You are an AI assistant that analyzes conversations and detects which business department the user belongs to and what automation task they need.

Analyze the conversation and return a JSON object with:
{
  "department": "SALES" | "HR" | "MARKETING" | "FINANCE" | "SUPPORT" | null,
  "intent": "brief description of what they want to automate",
  "agentDescription": "a clear description for building an AI agent to do this task",
  "confidence": 0.0 to 1.0,
  "shouldRedirect": true if you have enough info to build an agent, false if you need more info,
  "redirectMessage": "message to show before redirecting"
}

Department detection rules:
- SALES: mentions leads, outreach, CRM, pipeline, deals, prospects, customers, follow-up
- HR: mentions resumes, candidates, interviews, hiring, employees, onboarding, screening
- MARKETING: mentions campaigns, social media, content, captions, posts, analytics, email marketing
- FINANCE: mentions invoices, payments, approvals, expenses, reports, accounting, budget
- SUPPORT: mentions tickets, customer issues, complaints, help desk, escalations, responses

Only set shouldRedirect to true when you have enough information to build a specific agent.
Return ONLY valid JSON.`;

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Conversation to analyze:\n${conversationText}` }
      ],
      stream: false,
      format: 'json',
    }),
  });

  const data = await response.json();
  try {
    return JSON.parse(data.message.content);
  } catch {
    return { department: null, intent: null, agentDescription: null, confidence: 0 };
  }
}

// POST /api/chat/message — send message and get Ollama reply
router.post('/message', auth, async (req, res) => {
  try {
    const { messages } = req.body;
    const user = (req as any).user;

    const systemPrompt = `You are AgentForge Assistant — a friendly AI that helps company employees automate their repetitive work tasks. You work for ${user.company?.name || 'the company'}.

Your job is to:
1. Understand what repetitive tasks the employee does manually
2. Ask smart questions to understand their workflow better
3. Once you understand their need, tell them you will build an AI agent for them
4. Be conversational, warm, and encouraging
5. Keep responses concise and clear

When you have enough information about their task, say something like:
"Great! I have everything I need. Let me set up your AI agent now!"

Available departments: Sales, HR, Marketing, Finance, Support

Do NOT use bullet points excessively. Be conversational like a real assistant.
Do NOT ask more than 2 questions at a time.`;

    const ollamaMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: any) => ({ role: m.role, content: m.content }))
    ];

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: ollamaMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama returned status ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.message?.content || 'I apologize, I could not process that. Please try again.';

    const allMessages = [...messages, { role: 'assistant', content: assistantMessage }];
    
    let detection = { department: null, intent: null, agentDescription: null, confidence: 0, shouldRedirect: false, redirectMessage: '' };
    
    if (allMessages.length >= 4) {
      detection = await detectDepartmentAndIntent(allMessages) as any;
    }

    logger.info('chat_message', { userId: user.id, messageCount: allMessages.length });

    res.json({
      message: assistantMessage,
      detection,
    });

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error('chat_message_failed', { error: errMsg });
    res.status(500).json({ error: 'Failed to get response from AI. Make sure Ollama is running.' });
  }
});

export default router;