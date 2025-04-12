import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "@/pages/dashboard/page"
import "./styles.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />
	}
])

function App() {
	return <RouterProvider router={router} />
}

export default App
