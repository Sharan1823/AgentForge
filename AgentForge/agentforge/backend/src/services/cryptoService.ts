import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { env } from "../env";

type Envelope = {
  v: 1;
  alg: "aes-256-gcm";
  iv: string;
  tag: string;
  ciphertext: string;
};

function key(): Buffer {
  // Derive a stable 32-byte key from JWT_SECRET.
  return createHash("sha256").update(env("JWT_SECRET"), "utf8").digest();
}

export function encryptJson(value: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  const envelope: Envelope = {
    v: 1,
    alg: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
  return Buffer.from(JSON.stringify(envelope), "utf8").toString("base64");
}

export function decryptJson<T>(blob: string): T {
  const decoded = Buffer.from(blob, "base64").toString("utf8");
  const envelope = JSON.parse(decoded) as Envelope;
  if (envelope.v !== 1 || envelope.alg !== "aes-256-gcm") throw new Error("Unsupported envelope");
  const iv = Buffer.from(envelope.iv, "base64");
  const tag = Buffer.from(envelope.tag, "base64");
  const ciphertext = Buffer.from(envelope.ciphertext, "base64");
  const decipher = createDecipheriv("aes-256-gcm", key(), iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  return JSON.parse(plaintext) as T;
}

