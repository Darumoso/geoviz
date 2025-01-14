import { NextResponse } from 'next/server';
import db from '../../../app/lib/db';

// Obtener todas las instituciones
export async function GET() {
    try {
        const instituciones = await db.institucion.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(instituciones, { status: 200 });
    } catch (error) {
        return NextResponse.json({messsage: "Error al conectar con el servidor"}, { status: 500 });
    }
}

// Crear una nueva institución
export async function POST(req) {
    try {
        const { name, active } = await req.json();
        const existingInstitution = await db.institucion.findUnique({
            where: {
                name
            }
        });
        if (existingInstitution) {
            return NextResponse.json({message: "La institución ya está registrada."}, { status: 400 });
        }
        await db.institucion.create({ 
            data: {
                name,
                active: active === "true" ? true : false
            }
        });
        return NextResponse.json({message: "Institución creada exitosamente."}, { status: 201 });
    } catch (error) {
        return NextResponse.json({messsage: "Error al conectar con el servidor"}, { status: 500 })
    }
}

