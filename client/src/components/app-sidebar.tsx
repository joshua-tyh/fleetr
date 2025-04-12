"use client"

import * as React from "react"
import {
	BarChartIcon,
	ClipboardListIcon,
	DatabaseIcon,
	FileIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
	ListIcon,
	LocateIcon,
	SettingsIcon,
	UsersIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"

const data = {
	user: {
		name: "fleetr",
		email: "m@example.com",
		avatar: "/avatars/fleetr.jpg"
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: LayoutDashboardIcon
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: ListIcon
		},
		{
			title: "Analytics",
			url: "/analytics",
			icon: BarChartIcon
		},
		// {
		// 	title: "Projects",
		// 	url: "#",
		// 	icon: FolderIcon
		// },
		{
			title: "Team",
			url: "#",
			icon: UsersIcon
		}
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: SettingsIcon
		},
		{
			title: "Get Help",
			url: "#",
			icon: HelpCircleIcon
		}
		// {
		// 	title: "Search",
		// 	url: "#",
		// 	icon: SearchIcon
		// }
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: DatabaseIcon
		},
		{
			name: "Reports",
			url: "#",
			icon: ClipboardListIcon
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: FileIcon
		}
	]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="offcanvas"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<LocateIcon className="h-5 w-5" />
								<span className="text-base font-semibold">Fleetr.</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary
					items={data.navSecondary}
					className="mt-auto"
				/>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
