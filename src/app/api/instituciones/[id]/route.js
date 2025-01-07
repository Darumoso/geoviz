import { NextResponse } from 'next/server'
import db from '../../../../app/lib/db'

// Eliminar una institución
export async function DELETE(_, { params }) {
    try {
        const { id } = await params;
        await db.institucion.delete({
            where: { 
                id: parseInt(id, 10) 
            }
        });
        return NextResponse.json({ status: 200 }); 
    } catch (error) {
        return NextResponse.json({message: "Error al eliminar la institución."}, { status: 500})
    }
}