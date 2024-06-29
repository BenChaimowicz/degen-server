import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { degens } from './schema.js';
import type { TDegen, TNewDegen, TRawDegen, TTheme } from '../types.ts';


// const migrationClient = postgres('postgresql://postgres@localhost:5432/postgres', { max: 1 });
// migrate(drizzle(migrationClient), { migrationsFolder: './migrations' });

const queryClient = postgres(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`);
const db = drizzle(queryClient, { schema: { degens } });

export async function getDegen(id: number): Promise<TDegen | undefined> {
    try {
        const degen = await db.query.degens.findFirst({ where: eq(degens.id, id) });
        return degen;
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function getRandom(theme?: TTheme): Promise<TDegen[]> {
    try {
        if (theme) {
            const randomDegen = await db.select().from(degens).where(eq(degens.tag, theme)).orderBy(sql`RANDOM()`).limit(1);
            return randomDegen;
        }
        const randomDegen = await db.select().from(degens).orderBy(sql`RANDOM()`).limit(1);
        return randomDegen;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function saveDegens(...rawDegens: TRawDegen[]) {
    try {
        const formattedDegens: TNewDegen[] = rawDegens.map(d => { return { createdAt: new Date(), text: d.text, tag: d.theme } });
        const saveRes = await db.insert(degens).values(formattedDegens);
        console.log("🚀 ~ saveDegens ~ saveRes:", saveRes);
        return saveRes;
    } catch (error) {
        console.error(error);
        return error;
    }
}