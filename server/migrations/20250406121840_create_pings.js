/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	return knex.schema.createTable("pings", (table) => {
		table.increments("id").primary()
		table.integer("fleetr_id").references("fleetrs.id").notNullable().onDelete("CASCADE").onUpdate("CASCADE")
		table.double("latitude").notNullable()
		table.double("longitude").notNullable()
		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	return knex.schema.dropTableIfExists("pings")
}
