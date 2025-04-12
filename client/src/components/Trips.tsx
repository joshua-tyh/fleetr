import { useQuery } from "@tanstack/react-query"
import { fetchPings } from "../lib/getters"
import { groupPingsIntoTrips } from "@/lib/helpers"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"
import { Trip } from "@/lib/types"
import { useState } from "react"
import AnalyserMap from "./AnalyserMap"
import { ScrollArea } from "./ui/scroll-area"

export default function Trips() {
	const [selectedTrip, setSelectedTrip] = useState<Trip | undefined>()

	return (
		<div className="flex flex-col gap-2 h-full">
			<h1 className="text-2xl font-semibold">Trips</h1>
			<div className="flex flex-row gap-4 max-h-[calc(100vh-286px)] h-full">
				<TripsTable setSelectedTrip={setSelectedTrip} />
				<div className="rounded-lg overflow-hidden w-full h-full">
					<AnalyserMap trips={selectedTrip ? [selectedTrip] : []} />
				</div>
			</div>
		</div>
	)
}

function TripsTable({
	setSelectedTrip
}: Readonly<{ setSelectedTrip: (trip: Trip | undefined) => void }>) {
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
		<ScrollArea>
			<Table>
				<TableCaption>Click on a trip to view it on the map.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Fleetr ID</TableHead>
						<TableHead>Start</TableHead>
						<TableHead>End</TableHead>
						<TableHead>Distance</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className="text-right">No. of Pings</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((trip, index) => (
						<TableRow
							key={trip.fleetr_id + index}
							onClick={() => setSelectedTrip(trip)}
						>
							<TableCell className="font-medium">{trip.fleetr_id}</TableCell>
							<TableCell>
								{trip.path[0].lat.toFixed(3)}, {trip.path[0].lng.toFixed(3)}
							</TableCell>
							<TableCell>
								{trip.path[trip.path.length - 1].lat.toFixed(3)},{" "}
								{trip.path[trip.path.length - 1].lng.toFixed(3)}
							</TableCell>
							<TableCell>
								{Math.round(
									trip.path.reduce((acc, curr, i, arr) => {
										if (i === 0) return acc
										const prev = arr[i - 1]
										const distance = Math.sqrt(
											Math.pow(curr.lat - prev.lat, 2) +
												Math.pow(curr.lng - prev.lng, 2)
										)
										return acc + distance
									}, 0) * 1000
								)}{" "}
								km
							</TableCell>
							<TableCell>{new Date(trip.date).toLocaleDateString()}</TableCell>
							<TableCell className="text-right">{trip.path.length}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	)
}
