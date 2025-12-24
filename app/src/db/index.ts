import { drizzle } from "drizzle-orm/bun-sqlite"
import Database from "bun:sqlite"

const db = new Database(process.env.DB_FILE_NAME)
export const orm = drizzle(db)
