import { Map as GoogleMap, useMap } from "@vis.gl/react-google-maps"
import { useEffect, useMemo, useRef } from "react"
import { Trip } from "@/lib/types"

export default function Map({ trips }: Readonly<{ trips: Trip[] }>) {
	const center = useMemo(() => {
		if (trips.length === 0) return { lat: 1.3521, lng: 103.8198 }
		return {
			lat: trips[0].path[0].lat,
			lng: trips[0].path[0].lng
		}
	}, [trips])

	return (
		<GoogleMap
			defaultCenter={center}
			defaultZoom={12}
			gestureHandling={"greedy"}
			disableDefaultUI={true}
		>
			<PolylineRenderer trips={trips} />
		</GoogleMap>
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

				// Create a glowing ring effect
				const radius = 12
				const opacity = 0.5
				const glowingCircle = new google.maps.Circle({
					center: point,
					radius,
					strokeColor: "#4285F4",
					strokeOpacity: opacity,
					strokeWeight: 0,
					fillColor: "#4285F4",
					fillOpacity: opacity,
					map
				})

				circleRefs.current.push(glowingCircle)

				// Smoothly animate the glowing ring
				let startTime: number | null = null
				const duration = 2000 // duration of one pulse in milliseconds

				function animate(timestamp: number) {
					if (!startTime) startTime = timestamp
					const elapsed = timestamp - startTime

					// Calculate progress as a value between 0 and 1
					const progress = (elapsed % duration) / duration

					// Use a sine wave for smooth pulsing effect
					const easedProgress = 0.5 * (1 - Math.cos(progress * 2 * Math.PI))
					const newRadius = 12 + easedProgress * 8 // radius oscillates between 12 and 20
					const newOpacity = 0.5 - easedProgress * 0.5 // opacity oscillates between 0.5 and 0

					glowingCircle.setOptions({
						radius: newRadius,
						fillOpacity: newOpacity,
						strokeOpacity: newOpacity
					})

					// Continue the animation
					requestAnimationFrame(animate)
				}

				// Start the animation
				requestAnimationFrame(animate)
			})
		})

		return () => {
			polylineRefs.current.forEach((line) => line.setMap(null))
			circleRefs.current.forEach((circle) => circle.setMap(null))
		}
	}, [map, trips])

	return null
}
