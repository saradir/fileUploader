/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_ownerId_name_key" ON "Folder"("ownerId", "name");
