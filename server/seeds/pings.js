import { faker } from "@faker-js/faker"

const sgCoordinates = [
	{ lat: 1.3048, lng: 103.8318 }, // Orchard
	{ lat: 1.2854, lng: 103.8565 }, // Marina Bay
	{ lat: 1.3076, lng: 103.9082 }, // East Coast Park
	{ lat: 1.4419, lng: 103.8 }, // Woodlands
	{ lat: 1.3321, lng: 103.743 } // Jurong
]

export async function seed(knex) {
	await knex("pings").del()
	const pings = []
	let pingId = 1

	for (let fleetrId = 1; fleetrId <= 10; fleetrId++) {
		let totalPings = faker.number.int({ min: 20, max: 30 })
		let trips = 4
		let pingsPerTrip = Math.floor(totalPings / trips)
		let currentTime = new Date()

		for (let trip = 0; trip < trips; trip++) {
			const baseLocation = faker.helpers.arrayElement(sgCoordinates)
			let lat = baseLocation.lat
			let lng = baseLocation.lng

			for (let i = 0; i < pingsPerTrip; i++) {
				const jitterLat = faker.number.float({ min: -0.0008, max: 0.0008 })
				const jitterLng = faker.number.float({ min: -0.0008, max: 0.0008 })

				pings.push({
					id: pingId++,
					fleetr_id: fleetrId,
					latitude: lat + jitterLat,
					longitude: lng + jitterLng,
					created_at: new Date(currentTime),
					updated_at: new Date(currentTime)
				})

				currentTime = new Date(currentTime.getTime() + 2 * 60000) // 2 minutes later
			}

			// Add gap between trips
			currentTime = new Date(
				currentTime.getTime() + faker.number.int({ min: 30, max: 90 }) * 60000
			)
		}
	}

	await knex("pings").insert(pings)
}
