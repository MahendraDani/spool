/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workspaceId,name]` on the table `folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "folder_workspaceId_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "folder_slug_key" ON "folder"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "folder_workspaceId_name_key" ON "folder"("workspaceId", "name");
