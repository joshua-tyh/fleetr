import { useEffect, useState } from "react"
import { AdvancedMarker, Map as GoogleMap } from "@vis.gl/react-google-maps"
import { TruckIcon } from "lucide-react"
import { Fleetr, Ping } from "@/lib/types"

export default function TrackerMap({
	fleetr
}: Readonly<{ fleetr: Fleetr | undefined }>) {
	const [pings, setPings] = useState<Ping[]>([])

	useEffect(() => {
		if (!fleetr) return
		// Connect to the SSE endpoint
		const eventSource = new EventSource(`/sse/ping/?fleetr_id=${fleetr?.id}`)

		// Listen for incoming pings
		eventSource.onmessage = (event) => {
			const data: Ping[] | string = JSON.parse(event.data)
			if (typeof data === "string") {
				console.log(data)
				return
			}
			setPings(data)
		}

		// Cleanup on component unmount
		return () => {
			eventSource.close()
		}
	}, [fleetr])
	return (
		<GoogleMap
			defaultZoom={12}
			defaultCenter={{ lat: 1.3521, lng: 103.8198 }} // Center on Singapore
			disableDefaultUI={true}
			mapId="fleetr-tracker"
			gestureHandling="greedy"
		>
			{/* {fleetr && (
				<>
					<LivePolyline
						key={`polyline-${truck.id}`}
						path={truck.path}
					/>
					<PulsatingMarker
						key={`marker-${fleetr.id}`}
						position={truck.path[truck.path.length - 1]}
					/>
				</>
			)} */}

			{pings.map((ping) => (
				<PulsatingMarker
					key={ping.id}
					position={{ lat: ping.latitude, lng: ping.longitude }}
				/>
			))}
		</GoogleMap>
	)
}

// function LivePolyline({
// 	path
// }: Readonly<{ path: google.maps.LatLngLiteral[] }>) {
// 	const map = useMap()
// 	const polylineRef = useRef<google.maps.Polyline | null>(null)

// 	useEffect(() => {
// 		if (!map) return
// 		if (polylineRef.current) {
// 			polylineRef.current.setMap(null)
// 		}
// 		const polyline = new google.maps.Polyline({
// 			path,
// 			geodesic: true,
// 			strokeColor: "#4285F4",
// 			strokeOpacity: 0.8,
// 			strokeWeight: 2
// 		})
// 		polyline.setMap(map)
// 		polylineRef.current = polyline
// 		return () => polyline.setMap(null)
// 	}, [map, path])

// 	return null
// }

function PulsatingMarker({
	position
}: Readonly<{
	position: google.maps.LatLngLiteral
}>) {
	return (
		<AdvancedMarker position={position}>
			<div className="absolute inset-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 animate-slow-ping ease-linear" />

			<div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
				<TruckIcon className="size-4" />
			</div>
		</AdvancedMarker>
	)
}
