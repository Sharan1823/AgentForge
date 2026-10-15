# AgentForge

AgentForge is a production-ready, full‑stack **no‑code AI agent builder** for internal teams (Sales, HR, Marketing, Finance, Support). Employees log in, describe what they want in plain English, and AgentForge generates a structured agent definition, deploys it, runs it on demand or on a schedule, and enforces guardrails for sensitive actions.

## Problem statement

Teams waste time repeating the same manual workflows (triaging emails, updating CRMs, summarising meetings, chasing invoices, classifying tickets). Most employees can’t code and don’t want to maintain scripts. AgentForge turns natural language into **auditable, permissioned automations**.

## Architecture (high level)

```
             ┌───────────────────────────────┐
             │          Frontend             │
             │  Vite + React + Clerk + UI    │
             └───────────────┬───────────────┘
                             │ HTTPS (Axios)
                             v
┌───────────────────────────────────────────────────────────┐
│                         Backend                            │
│   Express + TypeScript                                     │
│   - Clerk JWT verification                                 │
│   - RBAC (department tools + data scope)                   │
│   - Builder (Anthropic Claude -> JSON AgentDefinition)     │
│   - Executor (LangChain -> steps -> integrations/tools)    │
│   - Guardrails (approval gate for sensitive actions)       │
│   - Scheduler (BullMQ + Redis repeatable jobs)             │
│   - RAG (OpenAI embeddings + Pinecone namespaces)          │
└───────────────┬───────────────────────────┬───────────────┘
                │                           │
                v                           v
        ┌───────────────┐           ┌───────────────┐
        │ Postgres DB    │           │ Redis         │
        │ Prisma ORM     │           │ BullMQ Queue  │
        └──────┬────────┘           └──────┬────────┘
               │                           │
               v                           v
        ┌───────────────┐           ┌───────────────┐
        │ Pinecone       │           │ Integrations  │
        │ RAG index      │           │ Gmail/Sheets  │
        └───────────────┘           │ Slack/HubSpot  │
                                    │ Freshdesk      │
                                    └───────────────┘
```

## Tech stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Zustand, React Router v6, Axios, Lucide React, React Hook Form, React Hot Toast, Recharts
- **Backend**: Node.js 20, Express, TypeScript, Prisma, Supabase JS client, BullMQ, Redis, Zod, Winston, Multer, node-cron, cors, dotenv
- **AI**: `@anthropic-ai/sdk`, LangChain (`@langchain/anthropic`, `@langchain/community`), Pinecone (`@pinecone-database/pinecone`), OpenAI (embeddings only)
- **Auth**: Clerk (`@clerk/clerk-react`, `@clerk/clerk-sdk-node`)
- **Integrations**: Google APIs, Slack Bolt, HubSpot API client, Freshdesk REST

## Setup

### 1) Install

```bash
cd agentforge
npm install
```

### 2) Configure environment

Copy and fill env:

```bash
copy .env.example .env
```

Required for local dev:

- `DATABASE_URL`: Postgres connection string (Supabase Postgres or local Postgres)
- `CLERK_SECRET_KEY` and `VITE_CLERK_PUBLISHABLE_KEY`
- `ANTHROPIC_API_KEY`
- `REDIS_URL`
- For RAG: `OPENAI_API_KEY`, `PINECONE_*`
- For integrations: Google / Slack / HubSpot / Freshdesk keys

### 3) Database migrate + seed

```bash
npm run prisma:generate -w backend
npm run prisma:migrate -w backend
npm run prisma:seed -w backend
```

### 4) Start dev servers

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3001`

## API endpoints

### Builder

- `POST /api/builder/interpret`
- `POST /api/builder/confirm`

### Agents

- `GET /api/agents`
- `GET /api/agents/:id`
- `PUT /api/agents/:id`
- `DELETE /api/agents/:id`
- `PATCH /api/agents/:id/status`

### Execute / Runs

- `POST /api/agents/:id/run`
- `GET /api/runs/:agentId`
- `GET /api/runs/:runId/status`
- `POST /api/runs/:runId/approve`
- `POST /api/runs/:runId/deny`

### Knowledge

- `POST /api/knowledge/:agentId/upload`
- `GET /api/knowledge/:agentId`
- `DELETE /api/knowledge/:kbId`

### Integrations

- `GET /api/integrations/status`
- `GET /api/integrations/gmail/connect`
- `GET /api/integrations/gmail/callback`
- `GET /api/integrations/slack/connect`
- `GET /api/integrations/slack/callback`
- `POST /api/integrations/hubspot/connect`
- `POST /api/integrations/freshdesk/connect`

### Marketplace

- `GET /api/marketplace`
- `POST /api/marketplace/:id/clone`
- `POST /api/marketplace/:id/publish`

### Suggestions

- `GET /api/suggestions`
- `POST /api/suggestions/:id/dismiss`

## How the agent builder works (plain English)

1. You describe an automation in plain English.
2. The backend asks Claude to convert that into a strict JSON `AgentDefinition` (department, trigger, tools, steps, guardrails, questions).
3. You answer clarifying questions (if any) and confirm deployment.
4. AgentForge saves the definition and (if scheduled) registers a repeatable BullMQ job.
5. When you run the agent, the executor follows each step, using integrations tools and/or the LLM, and logs everything.

## Integrations

- **Google (Gmail/Sheets)**: OAuth2; tokens stored per user; tools use those tokens at runtime.
- **Slack**: OAuth install via Slack; tokens stored per user.
- **HubSpot**: API key (or private app token) stored per user.
- **Freshdesk**: API key + domain stored per user.

## Guardrails

Guardrails define which actions require approval (e.g., send email, post to Slack). When a run reaches a sensitive action:\n\n- The executor pauses the run (`WAITING_APPROVAL`).\n- The UI shows an approval modal.\n- Approve continues; deny stops the run and marks it failed safely.\n+
## 2-minute demo script (hackathon)

1. Log in as HR.\n+2. Click **Build Agent**.\n+3. Paste: “Screen incoming resumes in Gmail, classify by role fit, and draft a short summary for each candidate, then post the shortlist to Slack weekly.”\n+4. Review workflow; connect Gmail/Sheets/Slack if prompted.\n+5. Deploy the **HR Resume Screener**.\n+6. Click **Run Now**.\n+7. When guardrail appears (Slack post), click **Approve**.\n+8. Open **Agent Detail** → show run logs + outputs.\n+
