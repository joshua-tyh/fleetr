import { faker } from "@faker-js/faker"

function interpolateRoute(start, end, steps) {
	const path = []
	const deltaLat = (end.lat - start.lat) / (steps - 1)
	const deltaLng = (end.lng - start.lng) / (steps - 1)

	for (let i = 0; i < steps; i++) {
		path.push({
			lat: start.lat + deltaLat * i,
			lng: start.lng + deltaLng * i
		})
	}

	return path
}

export async function seed(knex) {
	await knex("pings").del()
	await knex.raw("ALTER SEQUENCE pings_id_seq RESTART WITH 1")
	const pings = []

	for (let fleetrId = 1; fleetrId <= 10; fleetrId++) {
		let totalPings = faker.number.int({ min: 20, max: 30 })
		let trips = 4
		let pingsPerTrip = Math.floor(totalPings / trips)
		let currentTime = new Date()

		for (let trip = 0; trip < trips; trip++) {
			const start = faker.helpers.arrayElement(locations)
			let end = faker.helpers.arrayElement(locations)

			// Ensure start and end are different
			while (end.lat === start.lat && end.lng === start.lng) {
				end = faker.helpers.arrayElement(locations)
			}

			const tripPath = interpolateRoute(start, end, pingsPerTrip)

			for (let i = 0; i < pingsPerTrip; i++) {
				pings.push({
					fleetr_id: fleetrId,
					latitude: tripPath[i].lat,
					longitude: tripPath[i].lng,
					created_at: new Date(currentTime),
					updated_at: new Date(currentTime)
				})

				currentTime = new Date(currentTime.getTime() + 2 * 60000) // 2 minutes later
			}

			// Add gap between trips (30–90 min)
			currentTime = new Date(
				currentTime.getTime() + faker.number.int({ min: 30, max: 90 }) * 60000
			)
		}
	}

	await knex("pings").insert(pings)
}

const locations = [
	{ name: "Gardens by the Bay", lat: 1.282375, lng: 103.864273 },
	{ name: "Marina Bay Sands", lat: 1.2834, lng: 103.8607 },
	{ name: "Singapore Flyer", lat: 1.2895, lng: 103.8636 },
	{ name: "Merlion Park", lat: 1.2868, lng: 103.8545 },
	{ name: "Sentosa Island", lat: 1.2494, lng: 103.8303 },
	{ name: "Universal Studios Singapore", lat: 1.254, lng: 103.8238 },
	{ name: "Chinatown", lat: 1.284, lng: 103.8431 },
	{ name: "Little India", lat: 1.3065, lng: 103.8498 },
	{ name: "Clarke Quay", lat: 1.2907, lng: 103.8465 },
	{ name: "Orchard Road", lat: 1.305, lng: 103.8325 },
	{ name: "Singapore Botanic Gardens", lat: 1.3138, lng: 103.8159 },
	{ name: "National Museum of Singapore", lat: 1.2966, lng: 103.8485 },
	{ name: "ArtScience Museum", lat: 1.2869, lng: 103.8592 },
	{ name: "Esplanade – Theatres on the Bay", lat: 1.2892, lng: 103.8554 },
	{ name: "Raffles Hotel", lat: 1.294, lng: 103.8545 },
	{ name: "Fort Canning Park", lat: 1.2966, lng: 103.8465 },
	{ name: "Haw Par Villa", lat: 1.2869, lng: 103.7813 },
	{ name: "Singapore Zoo", lat: 1.4043, lng: 103.793 },
	{ name: "Night Safari", lat: 1.402, lng: 103.786 },
	{ name: "River Safari", lat: 1.4023, lng: 103.79 },
	{ name: "Jurong Bird Park", lat: 1.318, lng: 103.7064 },
	{ name: "East Coast Park", lat: 1.303, lng: 103.9123 },
	{ name: "Mount Faber Park", lat: 1.2738, lng: 103.8175 },
	{ name: "Bukit Timah Nature Reserve", lat: 1.3483, lng: 103.7785 },
	{ name: "Singapore Science Centre", lat: 1.3324, lng: 103.7354 },
	{ name: "Snow City", lat: 1.3321, lng: 103.735 },
	{ name: "National Gallery Singapore", lat: 1.2906, lng: 103.8512 },
	{ name: "Peranakan Museum", lat: 1.2946, lng: 103.8494 },
	{ name: "Asian Civilisations Museum", lat: 1.2877, lng: 103.8513 },
	{ name: "ION Orchard", lat: 1.3045, lng: 103.8318 },
	{ name: "Bugis Junction", lat: 1.2995, lng: 103.855 },
	{ name: "Plaza Singapura", lat: 1.2991, lng: 103.8457 },
	{ name: "IMM", lat: 1.3335, lng: 103.7462 },
	{ name: "VivoCity", lat: 1.2645, lng: 103.8225 },
	{ name: "HarbourFront Centre", lat: 1.2653, lng: 103.8208 },
	{ name: "Tanjong Pagar Centre", lat: 1.2774, lng: 103.8454 },
	{ name: "Changi Airport", lat: 1.3644, lng: 103.9915 },
	{ name: "Jewel Changi", lat: 1.3614, lng: 103.9894 },
	{ name: "Singapore Expo", lat: 1.3342, lng: 103.961 },
	{ name: "Tampines Mall", lat: 1.353, lng: 103.9442 },
	{ name: "Eastpoint Mall", lat: 1.3453, lng: 103.9523 },
	{ name: "Paya Lebar Quarter", lat: 1.3188, lng: 103.892 },
	{ name: "Serangoon Nex", lat: 1.3509, lng: 103.8721 },
	{ name: "Hougang Mall", lat: 1.3727, lng: 103.8932 },
	{ name: "AMK Hub", lat: 1.369, lng: 103.8497 },
	{ name: "Northpoint City", lat: 1.4279, lng: 103.8359 },
	{ name: "Causeway Point", lat: 1.436, lng: 103.7857 },
	{ name: "Lot One Shoppers’ Mall", lat: 1.3857, lng: 103.7446 },
	{ name: "West Mall", lat: 1.3496, lng: 103.7494 },
	{ name: "Jurong Point", lat: 1.3397, lng: 103.7069 },
	{ name: "Westgate", lat: 1.3331, lng: 103.7427 },
	{ name: "JCube", lat: 1.3336, lng: 103.7403 },
	{ name: "Clementi Mall", lat: 1.3156, lng: 103.7654 },
	{ name: "Bukit Panjang Plaza", lat: 1.3783, lng: 103.763 },
	{ name: "Yew Tee Point", lat: 1.3976, lng: 103.7473 },
	{ name: "Woodlands Civic Centre", lat: 1.4362, lng: 103.7863 },
	{ name: "Seletar Aerospace Park", lat: 1.4149, lng: 103.8656 },
	{ name: "Sengkang Sports Centre", lat: 1.3921, lng: 103.902 },
	{ name: "Punggol Waterway Point", lat: 1.4067, lng: 103.9022 },
	{ name: "The Seletar Mall", lat: 1.3871, lng: 103.8778 },
	{ name: "Changi Business Park", lat: 1.3456, lng: 103.9616 },
	{ name: "Pasir Ris Park", lat: 1.3812, lng: 103.9515 },
	{ name: "Bedok Mall", lat: 1.3248, lng: 103.9294 },
	{ name: "Kallang Wave Mall", lat: 1.3043, lng: 103.8746 },
	{ name: "Sports Hub", lat: 1.3005, lng: 103.8752 },
	{ name: "National Stadium", lat: 1.3049, lng: 103.8743 },
	{ name: "Stadium MRT", lat: 1.3027, lng: 103.8744 },
	{ name: "Singapore Indoor Stadium", lat: 1.3008, lng: 103.8758 },
	{ name: "Old Airport Road Food Centre", lat: 1.3116, lng: 103.8844 },
	{ name: "Maxwell Food Centre", lat: 1.2803, lng: 103.8443 },
	{ name: "Newton Food Centre", lat: 1.311, lng: 103.8398 },
	{ name: "Zion Riverside Food Centre", lat: 1.2923, lng: 103.8313 },
	{ name: "Lau Pa Sat", lat: 1.2804, lng: 103.8505 },
	{ name: "Tiong Bahru Market", lat: 1.2833, lng: 103.8326 },
	{ name: "Tekka Centre", lat: 1.3065, lng: 103.85 },
	{ name: "Chomp Chomp Food Centre", lat: 1.3584, lng: 103.8666 },
	{ name: "Geylang Serai Market", lat: 1.3171, lng: 103.8944 },
	{ name: "Bukit Timah Market", lat: 1.3415, lng: 103.7766 },
	{ name: "Adam Road Food Centre", lat: 1.3355, lng: 103.812 },
	{ name: "Toa Payoh HDB Hub", lat: 1.3325, lng: 103.8485 },
	{ name: "Marine Parade Central", lat: 1.3032, lng: 103.9061 },
	{ name: "Rochor Canal", lat: 1.3042, lng: 103.8525 },
	{ name: "Pasir Panjang Terminal", lat: 1.2675, lng: 103.8014 },
	{ name: "Tuas Mega Port", lat: 1.263, lng: 103.634 },
	{ name: "Sembawang Park", lat: 1.4594, lng: 103.8374 },
	{ name: "Yishun Dam", lat: 1.4187, lng: 103.8492 },
	{ name: "Marina Barrage", lat: 1.2803, lng: 103.8705 },
	{ name: "Bay East Garden", lat: 1.2871, lng: 103.8706 },
	{ name: "National Library", lat: 1.2976, lng: 103.8545 },
	{ name: "DUO Tower", lat: 1.301, lng: 103.8575 },
	{ name: "One Raffles Place", lat: 1.2842, lng: 103.8516 },
	{ name: "UOB Plaza", lat: 1.2851, lng: 103.8515 },
	{ name: "OCBC Centre", lat: 1.2846, lng: 103.8497 },
	{ name: "Raffles Place MRT", lat: 1.2831, lng: 103.8515 }
]
