import { NextResponse } from 'next/server';
import db from '../../../../app/lib/db';
import bcrypt from 'bcrypt';

// Eliminar un usuario
export async function DELETE(_, { params }) {
    try {
        const { id } = await params;
        await db.usuario.delete({
            where: { 
                id: Number(id) 
            }
        });
        return NextResponse.json({message: "Usuario eliminado exitosamente."}, { status: 200 }); 
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Error al eliminar al usuario."}, { status: 500});
    }
}

// Actualizar un usuario
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const { firstName, lastName, active, email, phone, isAdmin, institution, project } = await req.json();

        const existingUser = await db.usuario.findUnique({
            where: {
                email
            }
        });

        if (existingUser.id != id && existingUser.email === email) {
            return NextResponse.json({message: "El usuario ya está registrado."}, {status: 400});
        }

        await db.usuario.update({
            where: {
                id: Number(id)
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                active: active === "true" ? true : false,
                email: email,
                phone: phone ?? null,
                isAdmin: isAdmin === "true" ? true : false,
                idInstitucion: Number(institution),
                project: project
            }
        });
        return NextResponse.json({message: "Usuario actualizado exitosamente."}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error al actualizar al usuario."}, { status: 500 });
    }
}