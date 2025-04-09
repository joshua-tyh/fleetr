import { Fleetr, Ping } from "./types"

export async function fetchPings() {
	return fetch("/api/ping")
		.then((res) => res.json())
		.then((data: { message: string; pings: Ping[] }) => ({
			...data,
			pings: data.pings.map((ping) => ({
				...ping,
				created_at: new Date(ping.created_at),
				updated_at: new Date(ping.updated_at)
			}))
		}))
}

export async function fetchFleetrs() {
	return fetch("/api/fleetr")
		.then((res) => res.json())
		.then((data: { message: string; fleetrs: Fleetr[] }) => ({
			...data,
			fleetrs: data.fleetrs.map((fleetr) => ({
				...fleetr,
				created_at: new Date(fleetr.created_at),
				updated_at: new Date(fleetr.updated_at)
			}))
		}))
}
