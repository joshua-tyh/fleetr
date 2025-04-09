import { Map, useMap } from "@vis.gl/react-google-maps"
import { useEffect, useMemo, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchPings } from "../lib/getters"
import { groupPingsIntoTrips } from "../lib/helpers"
import { Trip } from "../lib/types"

export default function AnalyserMap() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["pings"],
		queryFn: fetchPings
	})

	const pings = useMemo(() => data?.pings || [], [data])

	const center = useMemo(() => {
		if (pings.length === 0) return { lat: 1.3521, lng: 103.8198 }
		return { lat: pings[0].latitude, lng: pings[0].longitude }
	}, [pings])

	const trips = useMemo(() => groupPingsIntoTrips(pings), [pings])

	if (isPending) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	return (
		<Map
			style={{ width: "100vw", height: "100vh" }}
			defaultCenter={center}
			defaultZoom={13}
			gestureHandling={"greedy"}
			disableDefaultUI={true}
		>
			<PolylineRenderer trips={trips} />
		</Map>
	)
}

// Renders a native Google Maps Polyline
function PolylineRenderer({ trips }: { trips: Trip[] }) {
	const map = useMap()
	const polylineRefs = useRef<google.maps.Polyline[]>([])
	const circleRefs = useRef<google.maps.Circle[]>([])

	useEffect(() => {
		if (!map) return

		// Clear old polylines
		polylineRefs.current.forEach((line) => line.setMap(null))
		circleRefs.current.forEach((circle) => circle.setMap(null))
		polylineRefs.current = []
		circleRefs.current = []

		// Draw new polylines and white circles
		trips.forEach((trip) => {
			const polyline = new google.maps.Polyline({
				path: trip.path,
				geodesic: true,
				strokeColor: "#4285F4",
				strokeOpacity: 1.0,
				strokeWeight: 3
			})

			polyline.setMap(map)
			polylineRefs.current.push(polyline)

			trip.path.forEach((point) => {
				const circle = new google.maps.Circle({
					center: point,
					radius: 12, // radius in meters
					strokeColor: "#ffffff",
					strokeOpacity: 1,
					strokeWeight: 1,
					fillColor: "#ffffff",
					fillOpacity: 1,
					map
				})

				circleRefs.current.push(circle)
			})
		})

		return () => {
			polylineRefs.current.forEach((line) => line.setMap(null))
			circleRefs.current.forEach((circle) => circle.setMap(null))
		}
	}, [map, trips])

	return null
}
