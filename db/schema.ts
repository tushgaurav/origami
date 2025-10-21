import { sqliteTable, integer, text, numeric } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";

export const user = sqliteTable("user", {
	id: integer().primaryKey({ autoIncrement: true }),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

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

export const user_preferences = sqliteTable("user_preferences", {
	id: integer().primaryKey({ autoIncrement: true }),
	user_id: integer().references(() => user.id),
	theme: text().notNull().default("system"),
	application_button_size: text().notNull().default("full"),
	application_show_description: integer().notNull().default(0),
	bookmark_button_size: text().notNull().default("full"),
	bookmark_show_description: integer().notNull().default(0),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: numeric("updated_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});