/*
  Warnings:

  - Added the required column `isAdmin` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;
