import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function GET() {
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
                ogc_fid as id,
                ST_X(wkb_geometry) AS longitude,
                ST_Y(wkb_geometry) AS latitude
            FROM puntos_temp;
        `);
        return NextResponse.json(result.rows, {status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "error"}, {status:500});
    } finally {
        await client.end();
    }
}

/* ogr2ogr -f "PostgreSQL" PG:"host=localhost dbname=geoviz user=postgres password=postgres" \
  -nln puntos_temp \
  -append \
  /home/edux/Downloads/output.geojson
 */