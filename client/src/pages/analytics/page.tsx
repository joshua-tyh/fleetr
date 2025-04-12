import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/pages/analytics/section-cards"
import Trips from "@/pages/analytics/trips"

export default function Page() {
	return (
		<SidebarProvider className="max-h-screen">
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader name="Analytics" />
				<div className="@container/main flex flex-1 flex-col gap-6 p-6">
					<div className="flex flex-col gap-4 md:gap-6">
						<SectionCards />
					</div>
					<Trips />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
