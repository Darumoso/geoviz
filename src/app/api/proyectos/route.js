import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET() { 
    try {
        const proyectos = await db.proyecto.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(proyectos, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ messsage: "Error al obtener los proyectos." }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name, description, active } = await req.json();
        const nameTrim = name.trim();
        const descriptionTrim = description.trim();
        const activeBool = active === "true" ? true : false;

        const existingProject = await db.proyecto.findUnique({
            where: {
                name: nameTrim
            }
        });
        
        if (existingProject) {
            return NextResponse.json({ message: "Proyecto ya registrado." }, { status: 400 });
        }
        
        await db.proyecto.create({
            data: {
                name: nameTrim,
                description: descriptionTrim,
                active: activeBool
            }
        });
        
        return NextResponse.json({ message: "Proyecto creado exitosamente." }, { status: 201 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error al crear el proyecto." }, { status: 500 });
    }
}