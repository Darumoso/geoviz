/*
  Warnings:

  - You are about to drop the column `proyecto` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `project` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "proyecto",
ADD COLUMN     "project" VARCHAR(40) NOT NULL;
