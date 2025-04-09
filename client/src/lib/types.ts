export type Fleetr = {
	id: number
	contact_number: string
	created_at: Date
	updated_at: Date
}

export type Ping = {
	id: number
	fleetr_id: number
	latitude: number
	longitude: number
	created_at: Date
	updated_at: Date
}

export type Trip = {
	fleetr_id: number
	path: google.maps.LatLngLiteral[]
}
