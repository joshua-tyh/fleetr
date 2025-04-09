/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	await knex("fleetrs").del()

	const fleetrs = []
	for (let i = 1; i <= 10; i++) {
		fleetrs.push({
			id: i,
			contact_number: `+659000000${i}`,
			created_at: new Date(),
			updated_at: new Date()
		})
	}

	await knex("fleetrs").insert(fleetrs)
}
