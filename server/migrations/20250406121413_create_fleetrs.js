/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	return knex.schema.createTable("fleetrs", (table) => {
		table.increments("id").primary()
		table.string("contact_number").notNullable().unique()
		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	return knex.schema.dropTableIfExists("fleetrs")
}
