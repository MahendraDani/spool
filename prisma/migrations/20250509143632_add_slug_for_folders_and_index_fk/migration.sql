/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,slug]` on the table `folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "folder_ownerId_idx";

-- DropIndex
DROP INDEX "folder_workspaceId_ownerId_name_key";

-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "folder_ownerId_workspaceId_idx" ON "folder"("ownerId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "folder_workspaceId_slug_key" ON "folder"("workspaceId", "slug");
