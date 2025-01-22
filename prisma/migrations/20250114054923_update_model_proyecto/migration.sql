/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Proyecto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Proyecto" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Proyecto_name_key" ON "Proyecto"("name");
