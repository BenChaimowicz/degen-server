CREATE TABLE IF NOT EXISTS "degens" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"text" text,
	"tag" text
);
