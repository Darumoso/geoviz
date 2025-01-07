import { NextResponse } from 'next/server'
import db from '../../../app/lib/db'


// Crear una nueva institución
export async function POST(request) {
    try {
        const data = await request.json()
        const institutionFound = await db.institucion.findUnique({
            where: {
                name: data.name
            }
        })
        if(institutionFound){
            return NextResponse.json({
                message: "La institución ya está registrada."
            }, {
                status: 400
            })
        }
        const newInstitution = await db.institucion.create({ data })
        return NextResponse.json(newInstitution, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

// Obtener todas las instituciones
export async function GET() {
    try {
        const instituciones = await db.institucion.findMany();
        return NextResponse.json(instituciones, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

