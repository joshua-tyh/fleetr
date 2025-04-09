import express from "express"
import bodyParser from "body-parser"
import Fleetr from "./models/fleetr.model.js"
import Ping from "./models/ping.model.js"
import { init as InitializeDatabase } from "./db.js"

const PORT = 8080
const app = express()

InitializeDatabase()

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api", (req, res) => {
	res.send("Hello World!")
})

app.post("/sms/ping", async (req, res) => {
	try {
		const { Body, From } = req.body

		const [latitude, longitude] = Body.split(",").map((coord) =>
			parseFloat(coord)
		)

		const ping = await Fleetr.receiveCoordinates(From, latitude, longitude)

		res.status(200).json({
			message: "Ping received successfully",
			...ping
		})
	} catch (error) {
		console.error("Error processing SMS request:", error.message)
		res
			.status(error.statusCode ?? 500)
			.send(error.message ?? "Internal Server Error")
		return
	}
})

app.post("/api/ping", async (req, res) => {
	try {
		const { latitude, longitude, contact_number } = req.body

		const ping = await Fleetr.receiveCoordinates(
			contact_number,
			latitude,
			longitude
		)

		res.status(200).json({
			message: "Ping received successfully",
			...ping
		})
	} catch (error) {
		console.error("Error processing HTTP request:", error.message)
		res
			.status(error.statusCode ?? 500)
			.send(error.message ?? "Internal Server Error")
		return
	}
})

app.get("/api/ping", async (req, res) => {
	try {
		const pings = await Ping.getAll()

		res.status(200).json({
			message: "Pings retrieved successfully",
			pings
		})
	} catch (error) {
		console.error("Error retrieving pings:", error.message)
		res
			.status(error.statusCode ?? 500)
			.send(error.message ?? "Internal Server Error")
		return
	}
})

app.get("/api/fleetr", async (req, res) => {
	try {
		const fleetrs = await Fleetr.getAll()

		res.status(200).json({
			message: "Fleetrs retrieved successfully",
			fleetrs
		})
	} catch (error) {
		console.error("Error retrieving fleetrs:", error.message)
		res
			.status(error.statusCode ?? 500)
			.send(error.message ?? "Internal Server Error")
		return
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
