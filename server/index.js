import express from "express"

const app = express()
const PORT = 8080

app.get("/", (req, res) => {
	res.send("Hello World!")
})

/**
 * @description This endpoint is used by Fleetr devices to report their locations.
 * Currently, it logs the received POST request and the request body to the console.
 *
 * @param req - The request object containing the incoming request data.
 * @param res - The response object used to send a response back to the client.
 */
app.post("/api/report", (req, res) => {
	console.log("Received a POST request")
	console.log(req.body)
	res.send("Hello from POST!")
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
