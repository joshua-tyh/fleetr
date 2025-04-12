import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "@/pages/dashboard/page"
import Analytics from "@/pages/analytics/page"
import "./styles.css"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />
	},
	{
		path: "/analytics",
		element: <Analytics />
	}
])

function App() {
	return <RouterProvider router={router} />
}

export default App
