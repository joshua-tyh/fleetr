import express from "express"
import bodyParser from "body-parser"
import Fleetr from "./models/fleetr.model.js"
import { init as InitializeDatabase } from "./db.js"

const PORT = 8080
const app = express()

InitializeDatabase()

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
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
			message: "Coordinates received successfully",
			...ping
		})
	} catch (error) {
		console.error("Error processing SMS:", error.message)
		res
			.status(error.statusCode ?? 500)
			.send(error.message ?? "Internal Server Error")
		return
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
