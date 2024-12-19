-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "institution" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "phone" VARCHAR(10),
    "firstName" VARCHAR(40) NOT NULL,
    "lastName" VARCHAR(40) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioProject" (
    "idUsuario" INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,

    CONSTRAINT "UsuarioProject_pkey" PRIMARY KEY ("idUsuario","idProject")
);

-- CreateTable
CREATE TABLE "Screen" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bitacora" (
    "idUsuario" INTEGER NOT NULL,
    "idScreen" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bitacora_pkey" PRIMARY KEY ("idUsuario","idScreen")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_phone_key" ON "Usuario"("phone");

-- AddForeignKey
ALTER TABLE "UsuarioProject" ADD CONSTRAINT "UsuarioProject_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioProject" ADD CONSTRAINT "UsuarioProject_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bitacora" ADD CONSTRAINT "Bitacora_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bitacora" ADD CONSTRAINT "Bitacora_idScreen_fkey" FOREIGN KEY ("idScreen") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
