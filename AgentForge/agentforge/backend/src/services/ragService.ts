import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import path from "node:path";
import fs from "node:fs";
import { envOptional } from "../env";

const embeddings = new OllamaEmbeddings({
  baseUrl: envOptional("OLLAMA_BASE_URL") ?? "http://localhost:11434",
  model: envOptional("OLLAMA_EMBED_MODEL") ?? "nomic-embed-text",
});

const CHROMA_URL = envOptional("CHROMA_URL") ?? "http://localhost:8000";

async function loadPdf(filePath: string): Promise<Document[]> {
  const pdfParse = (await import("pdf-parse")).default;
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return [new Document({ pageContent: data.text, metadata: { source: filePath } })];
}

async function loadDocx(filePath: string): Promise<Document[]> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ path: filePath });
  return [new Document({ pageContent: result.value, metadata: { source: filePath } })];
}

async function loadCsv(filePath: string): Promise<Document[]> {
  const text = fs.readFileSync(filePath, "utf-8");
  return [new Document({ pageContent: text, metadata: { source: filePath } })];
}

export async function uploadDocument(agentId: string, filePath: string, fileName: string) {
  const ext = path.extname(fileName).toLowerCase();

  let docs: Document[];
  if (ext === ".pdf") docs = await loadPdf(filePath);
  else if (ext === ".docx") docs = await loadDocx(filePath);
  else if (ext === ".csv") docs = await loadCsv(filePath);
  else throw new Error(`Unsupported file type: ${ext}`);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitDocuments(docs);

  await Chroma.fromDocuments(chunks, embeddings, {
    collectionName: `agent-${agentId}`,
    url: CHROMA_URL,
  });

  return { success: true, chunks: chunks.length, fileName };
}

export async function query(agentId: string, question: string, topK = 5): Promise<string> {
  try {
    const vectorStore = await Chroma.fromExistingCollection(embeddings, {
      collectionName: `agent-${agentId}`,
      url: CHROMA_URL,
    });
    const results = await vectorStore.similaritySearch(question, topK);
    return results.map((r) => r.pageContent).join("\n\n");
  } catch {
    return "";
  }
}

export async function deleteCollection(agentId: string) {
  const { ChromaClient } = await import("chromadb");
  const client = new ChromaClient({ path: CHROMA_URL });
  await client.deleteCollection({ name: `agent-${agentId}` });
}