import { Pool } from 'pg';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    const { id } = await params;
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'geoviz',
        password: 'postgres',
        port: 5432,
    });

    try {
        const result = await pool.query(`
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
    } 
}