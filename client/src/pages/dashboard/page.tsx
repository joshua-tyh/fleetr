import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/pages/dashboard/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import LiveTracker from "./live-tracker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
	return (
		<SidebarProvider className="max-h-screen">
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader name="Dashboard" />
				<div className="@container/main flex flex-1 flex-col gap-6 p-6">
					<div className="flex flex-col gap-4 md:gap-6">
						<SectionCards />
					</div>
					<Tabs
						defaultValue="show-all"
						className="w-full h-full"
					>
						<TabsList>
							<TabsTrigger
								value="show-all"
								className="w-full"
							>
								Map
							</TabsTrigger>
							<TabsTrigger
								value="track"
								className="w-full"
							>
								Track
							</TabsTrigger>
						</TabsList>
						<TabsContent
							value="show-all"
							className="w-full h-full"
						>
							<LiveTracker variant="show-all" />
						</TabsContent>
						<TabsContent
							value="track"
							className="w-full h-full"
						>
							<LiveTracker variant="track" />
						</TabsContent>
					</Tabs>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
