import { drizzle } from "drizzle-orm/bun-sqlite"
import Database from "bun:sqlite"

const db = new Database(process.env.DB_FILE_NAME ?? "./data/dash.db")
export const orm = drizzle(db)
