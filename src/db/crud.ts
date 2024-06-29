import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { degens as degenTable } from './schema.js';
import type { TDegen, TNewDegen, TRawDegen } from '../types.ts';


// const migrationClient = postgres('postgresql://postgres@localhost:5432/postgres', { max: 1 });
// migrate(drizzle(migrationClient), { migrationsFolder: './migrations' });

const queryClient = postgres(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`);
const db = drizzle(queryClient);

export async function getRandom(): Promise<TDegen[]> {
    try {
        const randomDegen = await db.select().from(degenTable).orderBy(sql`RANDOM()`).limit(1);
        return randomDegen;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function saveDegens(...degens: TRawDegen[]) {
    try {
        const formattedDegens: TNewDegen[] = degens.map(d => { return { createdAt: new Date(), text: d.text, tag: d.theme } });
        const saveRes = await db.insert(degenTable).values(formattedDegens);
        console.log("🚀 ~ saveDegens ~ saveRes:", saveRes);
        return saveRes;
    } catch (error) {
        console.error(error);
        return error;
    }
}