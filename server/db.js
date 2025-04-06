import knex from "knex"
import knexConfig from "./knexfile.js"

const db = knex(knexConfig)
const { NODE_ENV } = process.env

export async function init() {
	console.log("Initializing database...")
	await retryConnection()
		.then(async () => await check())
		.then(async (pass) => await migrate().then(() => pass))
		.then(async (pass) => !pass && (await seed()))
		.finally(() => console.log("Database initialization complete"))
		.catch((error) => {
			console.error("Error initializing database:", error)
		})
}

async function retryConnection(attempts = 5) {
	for (let i = 0; i < attempts; i++) {
		try {
			await db.raw("SELECT 1 + 1 AS result")
			console.log("Database connection successful")
			return
		} catch (error) {
			console.error(`Database connection failed (attempt ${i + 1})`)
			if (i < attempts - 1) {
				await new Promise((resolve) => setTimeout(resolve, 2000))
			} else {
				throw new Error(
					"Failed to connect to the database after multiple attempts:",
					error
				)
			}
		}
	}
}
async function migrate() {
	console.log("Running migrations...")
	await db.migrate.latest().then(() => {
		console.log("Migrations are up to date")
	})
}

async function seed() {
	if (NODE_ENV === "production") {
		console.log("Skipping seeds in production environment")
		return
	}
	console.log("Running seeds...")
	await db.seed.run().then(() => {
		console.log("Seeds are up to date")
	})
}

async function check() {
	const tables = ["fleetrs", "pings"]

	return Promise.all(tables.map((table) => db.schema.hasTable(table))).then(
		(exists) => {
			const missingTables = tables.filter((_, index) => !exists[index])

			if (missingTables.length > 0) {
				console.log(`Missing tables: ${missingTables.join(", ")}.`)
				return false
			} else {
				console.log("All required tables exist.")
				return true
			}
		}
	)
}

export default db
