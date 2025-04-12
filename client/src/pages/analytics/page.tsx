import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import Trips from "@/pages/analytics/trips"

export default function Page() {
	return (
		<SidebarProvider className="max-h-screen">
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader name="Analytics" />
				<div className="@container/main flex flex-1 flex-col gap-6 p-6">
					<Trips />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
