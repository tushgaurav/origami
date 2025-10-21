import { sqliteTable, integer, text, numeric } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";

export const hlItems = sqliteTable("hl_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	url: text().notNull(),
	description: text().notNull(),
	icon: text().notNull(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const bookmarks = sqliteTable("bookmarks", {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	url: text().notNull(),
	description: text().notNull(),
	icon: text().notNull(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});