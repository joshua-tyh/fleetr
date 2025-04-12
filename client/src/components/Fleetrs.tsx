import { useQuery } from "@tanstack/react-query"
import { fetchFleetrs } from "../lib/getters"

function Fleetrs() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["fleetrs"],
		queryFn: fetchFleetrs
	})

	if (isPending) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	return (
		<ul>
			{data.fleetrs.map((fleetr) => (
				<li key={fleetr.id}>
					{fleetr.contact_number} - {fleetr.created_at.toLocaleString()} -{" "}
					{fleetr.updated_at.toLocaleString()}
				</li>
			))}
		</ul>
	)
}
export default Fleetrs
