// Simple script to check the latest agent run
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the database file directly
const dbPath = path.join(__dirname, 'prisma', 'agentforge.db');

console.log('Checking recent PDF files...');
const reportsDir = path.join(__dirname, 'uploads', 'reports');
if (fs.existsSync(reportsDir)) {
  const files = fs.readdirSync(reportsDir);
  const pdfFiles = files.filter(f => f.endsWith('.pdf')).sort().reverse();
  console.log('Latest PDF files:');
  pdfFiles.slice(0, 5).forEach((file, i) => {
    const stats = fs.statSync(path.join(reportsDir, file));
    console.log(`${i+1}. ${file} - ${stats.size} bytes - ${stats.mtime.toLocaleString()}`);
  });
} else {
  console.log('No reports directory found');
}
