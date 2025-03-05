/*
  Warnings:

  - You are about to drop the column `userId` on the `friendships` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `friendships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_userId_fkey";

-- AlterTable
ALTER TABLE "friendships" DROP COLUMN "userId",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "contact_avatars" (
    "id" SERIAL NOT NULL,
    "ownerId" UUID NOT NULL,
    "friendShipId" INTEGER NOT NULL,
    "avatarId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_avatars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_avatars" ADD CONSTRAINT "contact_avatars_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_avatars" ADD CONSTRAINT "contact_avatars_friendShipId_fkey" FOREIGN KEY ("friendShipId") REFERENCES "friendships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_avatars" ADD CONSTRAINT "contact_avatars_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
