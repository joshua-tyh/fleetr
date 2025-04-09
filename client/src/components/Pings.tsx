import { useQuery } from "@tanstack/react-query"
import { fetchPings } from "../lib/getters"

function Pings() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["pings"],
		queryFn: fetchPings
	})

	if (isPending) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	return (
		<ul>
			Pings
			{data.pings.map((ping) => (
				<li key={ping.id}>
					{ping.id} - {ping.latitude}, {ping.longitude} -{" "}
					{ping.created_at.toLocaleString()} -{" "}
					{ping.updated_at.toLocaleString()}
				</li>
			))}
		</ul>
	)
}
export default Pings
