/*
  Warnings:

  - You are about to drop the column `public` on the `Folder` table. All the data in the column will be lost.
  - Made the column `token` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "public",
ALTER COLUMN "token" SET NOT NULL;
