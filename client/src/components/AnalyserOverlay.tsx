import Trips from "./Trips"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from "./ui/card"

export default function AnalyserOverlay() {
	return (
		<Card className="absolute top-0 right-0 w-full h-full box-border">
			<CardHeader>
				<CardTitle>Fleetr</CardTitle>
				<CardDescription>Welcome to Fleetr</CardDescription>
			</CardHeader>
			<CardContent className="overflow-y-auto">
				<Trips />
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	)
}
