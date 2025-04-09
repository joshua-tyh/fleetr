import db from "../db.js"
import createHttpError from "http-errors"

export default class Ping {
	constructor(id, fleetr_id, latitude, longitude, created_at, updated_at) {
		this.id = id
		this.fleetr_id = fleetr_id
		this.latitude = latitude
		this.longitude = longitude
		this.created_at = created_at
		this.updated_at = updated_at
	}

	static fromDbRow(row) {
		return new Ping(
			row.id,
			row.fleetr_id,
			row.latitude,
			row.longitude,
			row.created_at,
			row.updated_at
		)
	}

	static async getAll() {
		const rows = await db("pings").select("*")
		return rows.map(Ping.fromDbRow)
	}

	static async getById(id) {
		const row = await db("pings").where({ id }).first()
		return row ? Ping.fromDbRow(row) : null
	}

	static async getByFleetrId(fleetr_id) {
		const rows = await db("pings").where({ fleetr_id }).returning("*")
		return rows.map(Ping.fromDbRow)
	}

	static async create(fleetr_id, latitude, longitude) {
		const [row] = await db("pings")
			.insert({ fleetr_id, latitude, longitude })
			.returning("*")
		return Ping.fromDbRow(row)
	}

	static async update(id, fleetr_id, latitude, longitude) {
		await db("pings")
			.where({ id })
			.update({ fleetr_id, latitude, longitude })
			.returning("*")
		return Ping.fromDbRow(row)
	}

	static async delete(id) {
		await db("pings").where({ id }).del()
	}
}
