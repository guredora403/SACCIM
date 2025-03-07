-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('EMAIL', 'PHONE', 'LINE', 'GITHUB', 'TWITTER', 'INSTAGRAM', 'DISCORD', 'CUSTOMLINK', 'CUSTOMTEXT');

-- CreateTable
CREATE TABLE "contact_items" (
    "id" SERIAL NOT NULL,
    "ownerId" UUID NOT NULL,
    "type" "ContactType" NOT NULL,
    "displayText" TEXT,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contact_items" ADD CONSTRAINT "contact_items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
