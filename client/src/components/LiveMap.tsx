// LiveFleetrTracker.tsx
import { useEffect, useRef, useState } from "react"
import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps"

const jitterCoord = (value: number, jitterAmount = 0.0009) => {
	return value + (Math.random() * jitterAmount - jitterAmount / 2)
}

export default function LiveMap() {
	const [pings, setPings] = useState<google.maps.LatLngLiteral[]>([
		{ lat: 1.3048, lng: 103.8318 } // Starting point
	])

	// Add new ping every 2 seconds (for demo)
	useEffect(() => {
		const interval = setInterval(() => {
			setPings((prev) => {
				const last = prev[prev.length - 1]
				const newPing = {
					lat: jitterCoord(last.lat),
					lng: jitterCoord(last.lng)
				}
				return [...prev, newPing]
			})
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	const center = pings[pings.length - 1] // Always center on latest

	return (
		<Map
			defaultZoom={16}
			defaultCenter={center}
			mapId="fleetr-tracker"
			gestureHandling="greedy"
			style={{ width: "100%", height: "100vh" }}
		>
			<LivePolyline path={pings} />
			<PulsatingMarker position={center} />
		</Map>
	)
}

function LivePolyline({
	path
}: Readonly<{ path: google.maps.LatLngLiteral[] }>) {
	const map = useMap()
	const polylineRef = useRef<google.maps.Polyline | null>(null)

	useEffect(() => {
		if (!map) return
		if (polylineRef.current) {
			polylineRef.current.setMap(null)
		}
		const polyline = new google.maps.Polyline({
			path,
			geodesic: true,
			strokeColor: "#4285F4",
			strokeOpacity: 1.0,
			strokeWeight: 3
		})
		polyline.setMap(map)
		polylineRef.current = polyline
		return () => polyline.setMap(null)
	}, [map, path])

	return null
}

function PulsatingMarker({
	position
}: Readonly<{
	position: google.maps.LatLngLiteral
}>) {
	return (
		<AdvancedMarker position={position}>
			<div
				style={{
					width: "24px",
					height: "24px",
					borderRadius: "50%",
					backgroundColor: "#4285F4",
					boxShadow: "0 0 0 rgba(66, 133, 244, 0.4)",
					animation: "pulse 1.5s infinite"
				}}
			/>
		</AdvancedMarker>
	)
}
