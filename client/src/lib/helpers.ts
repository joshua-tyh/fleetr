import { Ping, Trip } from "./types"

export function groupPingsIntoTrips(pings: Ping[]): Trip[] {
	const sorted = [...pings].sort((a, b) => {
		if (a.fleetr_id !== b.fleetr_id) {
			return a.fleetr_id - b.fleetr_id
		}
		return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	})

	const trips: Trip[] = []
	let currentTrip: Trip | null = null
	let lastPingTime: Date | null = null
	let lastFleetrId: number | null = null

	for (const ping of sorted) {
		const pingTime = new Date(ping.created_at)

		const timeDiff =
			lastPingTime && ping.fleetr_id === lastFleetrId
				? (pingTime.getTime() - lastPingTime.getTime()) / (1000 * 60)
				: null

		const isNewTrip =
			lastFleetrId !== ping.fleetr_id || timeDiff === null || timeDiff > 2

		if (isNewTrip) {
			if (currentTrip) {
				trips.push(currentTrip)
			}
			currentTrip = {
				fleetr_id: ping.fleetr_id,
				path: []
			}
		}

		currentTrip?.path.push({
			lat: ping.latitude,
			lng: ping.longitude
		})

		lastPingTime = pingTime
		lastFleetrId = ping.fleetr_id
	}

	if (currentTrip) {
		trips.push(currentTrip)
	}

	return trips
}
