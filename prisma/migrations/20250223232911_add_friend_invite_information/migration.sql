-- CreateTable
CREATE TABLE "friend_invite_infomations" (
    "id" SERIAL NOT NULL,
    "avatarId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_invite_infomations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friend_invite_infomations_avatarId_key" ON "friend_invite_infomations"("avatarId");

-- AddForeignKey
ALTER TABLE "friend_invite_infomations" ADD CONSTRAINT "friend_invite_infomations_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
