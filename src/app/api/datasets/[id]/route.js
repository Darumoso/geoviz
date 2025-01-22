import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    const { id } = await params;
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'geoviz',
        password: 'postgres',
        port: 5432,
    });

    try {
        await client.connect();
        const result = await client.query(`
            SELECT 
                m AS pendiente,
                d AS desplazamientos
            FROM puntos_temp
            WHERE ogc_fid = $1;
        `, [id]);
        return NextResponse.json(result.rows, {status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "error"}, {status:500});
    } finally {
        await client.end();
    }
}