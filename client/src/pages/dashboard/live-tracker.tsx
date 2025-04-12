import { Fleetr } from "@/lib/types"
import { useState } from "react"
import DemoMap from "./demo-map"
import TrackerMap from "./tracker-map"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell
} from "@/components/ui/table"
import { fetchFleetrs } from "@/lib/getters"
import { useQuery } from "@tanstack/react-query"

export default function LiveTracker({
	variant
}: Readonly<{ variant: "show-all" | "track" }>) {
	const [selectedFleetr, setSelectedFleetr] = useState<Fleetr | undefined>()

	return (
		<div className="flex flex-col gap-2 h-full">
			<h1 className="text-2xl font-semibold">
				{variant === "show-all" ? "Live Fleetrs" : "Track A Fleetr"}
			</h1>
			<div className="flex flex-row gap-4 max-h-[calc(100vh-330px)] h-full">
				{variant === "track" && (
					<FleetrsTable setSelectedFleetr={setSelectedFleetr} />
				)}
				<div className="rounded-lg overflow-hidden w-full h-full">
					{variant === "show-all" ? (
						<DemoMap />
					) : (
						<TrackerMap fleetr={selectedFleetr} />
					)}
				</div>
			</div>
		</div>
	)
}

function FleetrsTable({
	setSelectedFleetr
}: Readonly<{ setSelectedFleetr: (trip: Fleetr | undefined) => void }>) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["fleetrs"],
		queryFn: () => fetchFleetrs().then((data) => data.fleetrs)
	})

	if (isPending) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	return (
		<ScrollArea className="min-w-72">
			<Table>
				<TableCaption>Click on a Fleetr to track it on the map.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Fleetr ID</TableHead>
						<TableHead className="text-right w-[200px]">Contact No.</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((fleetr) => (
						<TableRow
							key={fleetr.id}
							onClick={() => setSelectedFleetr(fleetr)}
						>
							<TableCell className="font-medium">{fleetr.id}</TableCell>
							<TableCell className="text-right">
								{fleetr.contact_number}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	)
}
