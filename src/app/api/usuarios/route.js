import { NextResponse } from 'next/server';
import db from '@/app/lib/db';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export async function GET() {
    try {
        const usuarios = await db.Usuario.findMany({
            orderBy: {
                id: "asc"
            },
            include: {
                Institucion: true
            }
            
        }); 

        const usuariosFiltrados = usuarios.map(({password, ...usuario}) => usuario);
        
        return NextResponse.json(usuariosFiltrados, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Error al obtener a los usuarios."}, { status: 500 });
    }                                           
}

// Crear un nuevo usuario
export async function POST(req) {
    try {
        const { firstName, lastName, active, email, phone, isAdmin, institution, project } = await req.json();

        const firstNameTrim = firstName.trim();
        const lastNameTrim = lastName.trim();
        const activeBool = active === "true" ? true : false;
        const emailTrim = email.trim();
        const phoneTrim = phone === "" ? null : phone.trim();
        const isAdminBool = isAdmin === "true" ? true : false;
        const idInstitucionNumber = Number(institution);
        const projectTrim = project.trim();

        const existingUser = await db.usuario.findUnique({
            where: {
                email: emailTrim
            }
        })

        if (existingUser) {
            return NextResponse.json({ message: "El usuario ya está registrado" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash("12345", 10);

        await db.usuario.create({
            data: {
                firstName: firstNameTrim,
                lastName: lastNameTrim,
                password: hashedPassword,
                active: activeBool,
                email: emailTrim,
                phone: phoneTrim,
                isAdmin: isAdminBool,
                idInstitucion: idInstitucionNumber,
                project: projectTrim
            }
        });
        return NextResponse.json({ message: "Usuario creado exitosamente." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error al crear al usuario." }, { status: 500 });
    }
}