/*
  Warnings:

  - Added the required column `proyecto` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bitacora" DROP CONSTRAINT "Bitacora_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioProyecto" DROP CONSTRAINT "UsuarioProyecto_idUsuario_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "proyecto" VARCHAR(40) NOT NULL;
