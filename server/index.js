import express from "express"
import bodyParser from "body-parser"
import Fleetr from "./models/fleetr.model.js"
import Ping from "./models/ping.model.js"
import { init as InitializeDatabase } from "./db.js"
import createHttpError from "http-errors"

const PORT = 8080
const app = express()

InitializeDatabase()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get("/sse/ping", async (req, res) => {
	try {
		const { fleetr_id } = req.query
		if (!fleetr_id) {
			throw createHttpError.BadRequest("Fleetr ID is required")
		}

		// Set headers for SSE
		res.setHeader("Content-Type", "text/event-stream")
		res.setHeader("Cache-Control", "no-cache")
		res.setHeader("Connection", "keep-alive")

		// Send an initial event to confirm the connection
		console.log("Client connected to SSE")
		res.write(`data: ${JSON.stringify("Connected to SSE")}\n\n`)

		// Function to send the latest pings
		const sendPings = async () => {
			const pings = await Ping.getByFleetrId(fleetr_id)
			res.write(`data: ${JSON.stringify(pings)}\n\n`)
		}

		sendPings()

		// Send pings every 2 seconds
		const interval = setInterval(sendPings, 2000)

		// Cleanup when the client disconnects
		req.on("close", () => {
			console.log("Client disconnected")
			clearInterval(interval)
			res.end()
		})
	} catch (error) {
		console.error("Error fetching pings:", error.message)
		res
			.status(error.statusCode ?? 500)
			.send(error.message ?? "Internal Server Error")
		return
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
