import { NextResponse } from 'next/server';
import db from '@/app/lib/db';
import bcrypt from 'bcrypt';

// Eliminar un usuario
export async function DELETE(_, { params }) {
    try {
        const { id } = await params;

        const idNumber = Number(id);

        await db.usuario.delete({
            where: { 
                id: idNumber
            }
        });

        return NextResponse.json({ message: "Usuario eliminado exitosamente." }, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar al usuario." }, { status: 500});
    }
}

// Actualizar un usuario
export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const { firstName, lastName, active, email, phone, isAdmin, institution, project } = await req.json();
        
        const idNumber = Number(id);
        const firstNameTrim = firstName.trim();
        const lastNameTrim = lastName.trim();
        const activeBool = active === "true" ? true : false;
        const emailTrim = email.trim();
        const phoneValue = phone === "" ? null : phone;
        console.log("before phone")
        const isAdminBool = isAdmin === "true" ? true : false;
        const idInstitucionNumber = Number(institution);
        const projectTrim = project.trim();

        const existingUser = await db.usuario.findUnique({
            where: {
                email: emailTrim
            }
        });
        
        if (existingUser) {
            if (existingUser.id != idNumber && existingUser.email === emailTrim) {
                return NextResponse.json({ message: "El usuario ya está registrado." }, { status: 400 });
            }
        }

        await db.usuario.update({
            where: {
                id: idNumber
            },
            data: {
                firstName: firstNameTrim,
                lastName: lastNameTrim,
                active: activeBool,
                email: emailTrim,
                phone: phoneValue,
                isAdmin: isAdminBool,
                idInstitucion: idInstitucionNumber,
                project: projectTrim
            }
        });
        return NextResponse.json({ message: "Usuario actualizado exitosamente." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error al actualizar al usuario." }, { status: 500 });
    }
}