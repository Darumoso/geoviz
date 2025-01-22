import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

// Obtener una institución por ID
export async function GET(_, { params }) {
    try {
        const { id } = await params;
        const idNumber = Number(id);

        const institucion = await db.institucion.findUnique({
            where: {
                id: idNumber
            }
        });
        return NextResponse.json(institucion, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Error al obtener la institución."}, { status: 500 });
    }
}

// Editar una institución
export async function PUT(req, { params }){
    try {
        const { id } = await params;
        const { name, active } = await req.json();
        
        const nameTrim = name.trim();
        const activeBool = active === "true" ? true : false;
        const idNumber = Number(id);

        const existingInstitution = await db.institucion.findUnique({
            where: {
                name: nameTrim
            }
        });

        if (existingInstitution) {
            if (existingInstitution.id != idNumber && existingInstitution.name === nameTrim) {
                return NextResponse.json({ message: "La institución ya existe." }, { status: 400 });
            }
        }

        await db.institucion.update({
            where: {
                id: idNumber
            },
            data: {
                name: nameTrim,
                active: activeBool
            }
        });
        
        return NextResponse.json({message: "Institución actualizada exitosamente."}, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Error al actualizar la institución."}, { status: 500 });
    }
}

// INACTIVO (ELIMINACIÓN LÓGICA)
// Eliminar una institución 
export async function DELETE(_, { params }) {
    try {
        const { id } = await params;
        await db.institucion.delete({
            where: { 
                id: Number(id) 
            }
        });
        return NextResponse.json({message: "Institución eliminada exitosamente."}, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({message: "Error al eliminar la institución."}, { status: 500});
    }
}