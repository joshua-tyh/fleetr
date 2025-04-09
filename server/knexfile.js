import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const MIGRATIONS_DIR = path.resolve(__dirname, "./migrations")
export const SEEDS_DIR = path.resolve(__dirname, "./seeds")
export default {
	client: "pg",
	connection: {
		connectionString: process.env.DATABASE_URL
	},
	migrations: {
		directory: MIGRATIONS_DIR
	},
	seeds: {
		directory: SEEDS_DIR
	}
}
