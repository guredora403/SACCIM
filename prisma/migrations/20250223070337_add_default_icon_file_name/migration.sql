/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `avatars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "iconUrl",
ADD COLUMN     "iconFileName" TEXT NOT NULL DEFAULT 'avatars/default.png';
