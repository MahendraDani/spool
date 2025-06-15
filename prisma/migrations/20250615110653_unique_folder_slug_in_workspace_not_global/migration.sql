/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,slug]` on the table `folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "folder_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "folder_workspaceId_slug_key" ON "folder"("workspaceId", "slug");
