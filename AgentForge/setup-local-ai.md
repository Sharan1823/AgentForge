# AgentForge — Local Setup Guide
## Everything runs offline. No internet needed after setup.

## Prerequisites
- Node.js 20+
- Python 3.8+ (for ChromaDB)
- Redis (local)

## Step 1 — Install Ollama
Install Ollama for your OS (one time).

## Step 2 — Pull AI Models (one time only)
```bash
ollama pull llama3.1
ollama pull nomic-embed-text
```

## Step 3 — Start Ollama
```bash
ollama serve
```
Runs on `http://localhost:11434`.

## Step 4 — Install and Start ChromaDB
```bash
pip install chromadb
chroma run --path ./chroma-data
```
Runs on `http://localhost:8000`.

## Step 5 — Start Redis
Run Redis locally on `localhost:6379`.

## Step 6 — Set Up Database (SQLite)
```bash
cd agentforge/backend
cp ../.env.example .env
.\node_modules\.bin\prisma.cmd migrate dev --name init --schema prisma/schema.prisma
.\node_modules\.bin\prisma.cmd db seed --schema prisma/schema.prisma
```

## Step 7 — Start AgentForge
Terminal 1 — Backend:
```bash
cd agentforge/backend
npm --no-workspaces run dev
```

Terminal 2 — Frontend:
```bash
cd agentforge/frontend
npm --no-workspaces run dev
```

Open the printed Vite URL (usually `http://localhost:5173` or `http://localhost:5174`).

## Verify everything is running
```bash
curl http://localhost:11434/api/tags
curl http://localhost:8000/api/v1/heartbeat
redis-cli ping
curl http://localhost:8080/api/health
```

