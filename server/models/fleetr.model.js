import db from "../db.js"
import createHttpError from "http-errors"
import Ping from "./ping.model.js"

export default class Fleetr {
	constructor(id, contact_number, created_at, updated_at) {
		this.id = id
		this.contact_number = contact_number
		this.created_at = created_at
		this.updated_at = updated_at
	}

	static async receiveCoordinates(contact_number, latitude, longitude) {
		if (isNaN(latitude) || isNaN(longitude)) {
			throw createHttpError.BadRequest(
				"Invalid coordinates. Please send in the format: 'latitude, longitude'"
			)
		}

		const fleetr = await Fleetr.getByContactNumber(contact_number).then(
			async (fleetr) =>
				fleetr === null ? await Fleetr.create(contact_number) : fleetr
		)

		return await Ping.create(fleetr.id, latitude, longitude)
	}

	static fromDbRow(row) {
		return new Fleetr(
			row.id,
			row.contact_number,
			row.created_at,
			row.updated_at
		)
	}

	static async getAll(db) {
		const rows = await db("fleetrs").select("*")
		return rows.map(Fleetr.fromDbRow)
	}

	static async getById(id) {
		const row = await db("fleetrs").where({ id }).first()
		return row ? Fleetr.fromDbRow(row) : null
	}

	static async getByContactNumber(contact_number) {
		const row = await db("fleetrs").where({ contact_number }).first()
		return row ? Fleetr.fromDbRow(row) : null
	}

	static async create(contact_number) {
		const [row] = await db("fleetrs").insert({ contact_number }).returning("*")
		return Fleetr.fromDbRow(row)
	}

	static async update(id, contact_number) {
		await db("fleetrs").where({ id }).update({ contact_number }).returning("*")
		return Fleetr.fromDbRow(row)
	}

	static async delete(id) {
		await db("fleetrs").where({ id }).del()
	}
}
