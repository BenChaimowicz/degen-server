import { pgTable, date, serial, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const degens = pgTable("degens", {
	created_at: date("created_at"),
	id: serial("id").primaryKey().notNull(),
	text: text("text"),
	tag: text("tag"),
});