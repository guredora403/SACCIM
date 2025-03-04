/*
  Warnings:

  - You are about to drop the column `status` on the `friendships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "friendships" DROP COLUMN "status";

-- DropEnum
DROP TYPE "FriendStatus";

-- CreateTable
CREATE TABLE "friend_requests" (
    "id" SERIAL NOT NULL,
    "senderAvatarId" INTEGER NOT NULL,
    "senderUserId" UUID NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "recipientUserId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friend_requests_senderUserId_recipientUserId_key" ON "friend_requests"("senderUserId", "recipientUserId");

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_senderAvatarId_fkey" FOREIGN KEY ("senderAvatarId") REFERENCES "avatars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "avatars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_recipientUserId_fkey" FOREIGN KEY ("recipientUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
