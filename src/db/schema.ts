import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const degens = pgTable('degens', { id: serial('id').primaryKey(), createdAt: timestamp('created_at').defaultNow(), text: text('text'), tag: text('tag') });

export type DBDegen = typeof degens.$inferSelect;
export type DBNewDegen = typeof degens.$inferInsert;