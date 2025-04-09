import AnalyserOverlay from "./components/AnalyserOverlay"
import AnalyserMap from "./components/AnalyserMap"
import MapLayout from "./layouts/MapLayout"

function App() {
	return (
		<MapLayout map={<AnalyserMap />}>
			<AnalyserOverlay />
		</MapLayout>
	)
}

export default App
