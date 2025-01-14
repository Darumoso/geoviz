import { NextResponse } from 'next/server';
import db from '../../../../app/lib/db';

// Obtener una institución por ID
export async function GET(_, { params }) {
    try {
        const { id } = await params;
        const institucion = await db.institucion.findUnique({
            where: {
                id: Number(id)
            }
        })
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
        await db.institucion.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                active: active === "true" ? true : false
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