import { useEffect, useState } from "react"
import { AdvancedMarker, Map as GoogleMap } from "@vis.gl/react-google-maps"
import { TruckIcon } from "lucide-react"

type Truck = {
	id: number
	start: google.maps.LatLngLiteral
	destination: google.maps.LatLngLiteral
	path: google.maps.LatLngLiteral[]
}

export default function DemoMap() {
	const [trucks, setTrucks] = useState<Truck[]>([
		{
			id: 1,
			start: { lat: 1.3048, lng: 103.8318 }, // Orchard Road
			destination: { lat: 1.436, lng: 103.786 }, // Woodlands
			path: [{ lat: 1.3048, lng: 103.8318 }]
		},
		{
			id: 2,
			start: { lat: 1.3521, lng: 103.8198 }, // Downtown Core
			destination: { lat: 1.45, lng: 103.8 }, // Yishun
			path: [{ lat: 1.3521, lng: 103.8198 }]
		},
		{
			id: 3,
			start: { lat: 1.2802, lng: 103.8519 }, // Marina Bay
			destination: { lat: 1.4, lng: 103.9 }, // Ang Mo Kio
			path: [{ lat: 1.2802, lng: 103.8519 }]
		},
		{
			id: 4,
			start: { lat: 1.36, lng: 103.94 }, // Tampines
			destination: { lat: 1.42, lng: 103.78 }, // Bukit Panjang
			path: [{ lat: 1.36, lng: 103.94 }]
		},
		{
			id: 5,
			start: { lat: 1.25, lng: 103.83 }, // Sentosa
			destination: { lat: 1.43, lng: 103.77 }, // Choa Chu Kang
			path: [{ lat: 1.25, lng: 103.83 }]
		}
	])

	const moveTowards = (
		current: number,
		target: number,
		step: number
	): number => {
		const jitteredStep = step * (0.7 + Math.random() * 0.6)
		if (Math.abs(target - current) <= jitteredStep) return target
		return current + (target > current ? jitteredStep : -jitteredStep)
	}

	// Update each truck's position every 2 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setTrucks((prevTrucks) =>
				prevTrucks.map((truck) => {
					const last = truck.path[truck.path.length - 1]
					const step = 0.0005 // Adjust step size for smoother movement
					const newPing = {
						lat: moveTowards(last.lat, truck.destination.lat, step),
						lng: moveTowards(last.lng, truck.destination.lng, step)
					}
					return {
						...truck,
						path: [...truck.path, newPing]
					}
				})
			)
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	return (
		<GoogleMap
			defaultZoom={12}
			defaultCenter={{ lat: 1.3521, lng: 103.8198 }} // Center on Singapore
			disableDefaultUI={true}
			mapId="fleetr-tracker"
			gestureHandling="greedy"
		>
			{trucks.map((truck) => (
				<PulsatingMarker
					key={`marker-${truck.id}`}
					position={truck.path[truck.path.length - 1]}
				/>
			))}
		</GoogleMap>
	)
}

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
