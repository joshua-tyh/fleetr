import { useQuery } from "@tanstack/react-query"
import { fetchPings } from "../lib/getters"
import { groupPingsIntoTrips } from "@/lib/helpers"

export default function Trips() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["trips"],
		queryFn: () => fetchPings().then((data) => groupPingsIntoTrips(data.pings))
	})

	if (isPending) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	return (
		<ul>
			Trips
			{data.map((trip, index) => (
				<li key={trip.fleetr_id}>
					Trip {index}. - {trip.path.length} points
					<ul>
						{trip.path.map((point, index) => (
							<li key={index}>
								{point.lat.toFixed(4)}, {point.lng.toFixed(4)} {"->"}{" "}
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	)
}
