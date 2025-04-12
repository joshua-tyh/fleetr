import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card ">
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Operators in activity</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						32
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs"
						>
							<TrendingDownIcon className="size-3" />
							-2.0%
						</Badge>
					</div>
				</CardHeader>
			</Card>
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Active Vehicles</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						20
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs"
						>
							<TrendingUpIcon className="size-3" />
							+4.0%
						</Badge>
					</div>
				</CardHeader>
			</Card>
		</div>
	)
}
