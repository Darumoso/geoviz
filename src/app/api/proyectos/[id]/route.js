import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const { name, description, active } = await req.json();
        
        const idNumber = Number(id);
        const nameTrim = name.trim();
        const descriptionTrim = description.trim();
        const activeBool = active === "true" ? true : false;

        const existingProject = await db.proyecto.findUnique({
            where: {
                name: nameTrim
            }
        });

        if (existingProject) {
            if (existingProject.id != idNumber && existingProject.name === nameTrim) {
                return NextResponse.json({ message: "El proyecto ya existe." }, { status: 400 });
            }
        }

        await db.proyecto.update({
            where: {
                id: idNumber
            },
            data:{
                name: nameTrim,
                description: descriptionTrim,
                active: activeBool
            }
        });
        
        return NextResponse.json({ message: "Proyecto actualizado exitosamente." }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: "Error al actualizar el proyecto." }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        const { id } = await params;
        
        const idNumber = Number(id);

        await db.proyecto.delete({
            where: {
                id: idNumber
            }
        });

        return NextResponse.json({ message: "Proyecto eliminado exitosamente." }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ message: "Error al eliminar el proyecto." }, { status: 500 });
    }
}