/*
  Warnings:

  - A unique constraint covering the columns `[friendShipId,avatarId]` on the table `contact_avatars` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contact_avatars_friendShipId_avatarId_key" ON "contact_avatars"("friendShipId", "avatarId");
