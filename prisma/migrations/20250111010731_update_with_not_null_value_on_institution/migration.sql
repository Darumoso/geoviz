/*
  Warnings:

  - Made the column `idInstitucion` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_idInstitucion_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "idInstitucion" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idInstitucion_fkey" FOREIGN KEY ("idInstitucion") REFERENCES "Institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
