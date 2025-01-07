/*
  Warnings:

  - You are about to drop the column `description` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `institution` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idInstitucion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UsuarioProject" DROP CONSTRAINT "UsuarioProject_idProject_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioProject" DROP CONSTRAINT "UsuarioProject_idUsuario_fkey";

-- AlterTable
ALTER TABLE "Bitacora" ALTER COLUMN "dateTime" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "institution",
ADD COLUMN     "idInstitucion" INTEGER NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "phone" SET NOT NULL;

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "UsuarioProject";

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioProyecto" (
    "idUsuario" INTEGER NOT NULL,
    "idProyecto" INTEGER NOT NULL,

    CONSTRAINT "UsuarioProyecto_pkey" PRIMARY KEY ("idUsuario","idProyecto")
);

-- CreateTable
CREATE TABLE "Institucion" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,

    CONSTRAINT "Institucion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idInstitucion_fkey" FOREIGN KEY ("idInstitucion") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioProyecto" ADD CONSTRAINT "UsuarioProyecto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioProyecto" ADD CONSTRAINT "UsuarioProyecto_idProyecto_fkey" FOREIGN KEY ("idProyecto") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
