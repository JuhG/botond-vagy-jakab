DO $$ BEGIN
 CREATE TYPE "child" AS ENUM('Botond', 'Jakab');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"child" child NOT NULL,
	"image" varchar NOT NULL,
	"botond" integer DEFAULT 0 NOT NULL,
	"jakab" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
