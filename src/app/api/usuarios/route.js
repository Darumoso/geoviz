import { NextResponse } from 'next/server';
import db from '../../../app/lib/db';
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
        return NextResponse.json({message: "Error al obtener instituciones."}, { status: 500 });
    }                                           
}

// Crear un nuevo usuario
export async function POST(req) {
    try {
        const { firstName, lastName, active, email, phone, isAdmin, institution, project } = await req.json();
        
        const existingUser = await db.usuario.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return NextResponse.json({message: "El usuario ya está registrado"}, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash("12345", 10);

        await db.usuario.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                active: active === "true" ? true : false,
                email: email,
                phone: phone === "" ? null : phone,
                isAdmin: isAdmin === "true" ? true : false,
                idInstitucion: Number(institution),
                project: project
            }
        });
        return NextResponse.json({message: "Usuario creado exitosamente."}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error al crear al usuario."}, { status: 500 });
    }
}