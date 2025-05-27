/*
  Warnings:

  - A unique constraint covering the columns `[profileId,tagId]` on the table `ProfileTag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProfileTag_profileId_key";

-- DropIndex
DROP INDEX "ProfileTag_tagId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTag_profileId_tagId_key" ON "ProfileTag"("profileId", "tagId");
