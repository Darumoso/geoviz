import { NextResponse } from 'next/server'
import db from '../../../app/lib/db'
import bcrypt from 'bcrypt'


// Crear un nuevo usuario
export async function POST(request) {
    const data = await request.json()

    console.log(data)
    const newUser = await db.usuario.create({
        data
    })

    return NextResponse.json(newUser)
}


/*// Obtener todos los usuarios
export async function GETALL() {
    try {
        const users = await db.Usuario.findMany(); 
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.error();
    }
}

// Crear un nuevo usuario
export async function POST(request) {
    try {
        const { firstName, lastName, email, password, institution, phone, active } = await request.json();
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.Usuario.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            institution,
            phone,
            active,
        },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.error();
    }
}

// Obtener usuario por ID
export async function GET({ params }) {
    const { id } = params;
    try {
        const user = await db.Usuario.findUnique({
        where: { id: parseInt(id) },
        });

        if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.error();
    }
}

// Actualizar un usuario
export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const { firstName, lastName, email, password, institution, phone, active } = await request.json();

        let hashedPassword = undefined;
        if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await db.Usuario.update({
        where: { id: parseInt(id) },
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            institution,
            phone,
            active,
        },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.error();
    }
}

// Eliminar un usuario
export async function DELETE({ params }) {
    const { id } = params;
    try {
        const deletedUser = await db.Usuario.delete({
        where: { id: parseInt(id) }, 
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return NextResponse.error();
    }
}*/
