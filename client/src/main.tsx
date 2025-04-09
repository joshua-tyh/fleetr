import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./styles.css"
import App from "./App.tsx"
import { APIProvider } from "@vis.gl/react-google-maps"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<App />
			</APIProvider>
		</QueryClientProvider>
	</StrictMode>
)
