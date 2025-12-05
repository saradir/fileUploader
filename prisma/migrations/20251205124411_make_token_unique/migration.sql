/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Folder_token_key" ON "Folder"("token");
