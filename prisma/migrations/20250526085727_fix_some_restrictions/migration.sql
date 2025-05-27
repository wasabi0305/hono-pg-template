/*
  Warnings:

  - A unique constraint covering the columns `[senderId,recipientId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Chat_recipientId_key";

-- DropIndex
DROP INDEX "Chat_senderId_key";

-- DropIndex
DROP INDEX "Like_recipientId_key";

-- DropIndex
DROP INDEX "Like_senderId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_senderId_recipientId_key" ON "Like"("senderId", "recipientId");
