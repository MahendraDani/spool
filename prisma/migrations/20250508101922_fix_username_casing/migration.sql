/*
  Warnings:

  - You are about to drop the column `displayUserName` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "displayUserName",
ADD COLUMN     "displayUsername" TEXT;
