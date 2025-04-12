/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	await knex("fleetrs").del()
	await knex.raw("ALTER SEQUENCE fleetrs_id_seq RESTART WITH 1")

	const fleetrs = []
	for (let i = 0; i <= 9; i++) {
		fleetrs.push({
			contact_number: `+659000000${i}`,
			created_at: new Date(),
			updated_at: new Date()
		})
	}

	await knex("fleetrs").insert(fleetrs)
}
