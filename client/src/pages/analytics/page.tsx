import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/pages/dashboard/section-cards"
import { SiteHeader } from "@/components/site-header"
import Trips from "@/pages/dashboard/trips"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

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
