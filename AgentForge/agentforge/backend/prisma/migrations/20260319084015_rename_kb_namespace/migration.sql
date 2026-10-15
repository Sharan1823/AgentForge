/*
  Warnings:

  - You are about to drop the column `pineconeNamespace` on the `KnowledgeBase` table. All the data in the column will be lost.
  - Added the required column `vectorNamespace` to the `KnowledgeBase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KnowledgeBase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "agentId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "vectorNamespace" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KnowledgeBase_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_KnowledgeBase" ("agentId", "createdAt", "fileName", "fileUrl", "id") SELECT "agentId", "createdAt", "fileName", "fileUrl", "id" FROM "KnowledgeBase";
DROP TABLE "KnowledgeBase";
ALTER TABLE "new_KnowledgeBase" RENAME TO "KnowledgeBase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
