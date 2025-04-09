type MapLayoutProps = {
	map: React.ReactNode
	children?: React.ReactNode
}

export default function MapLayout({ map, children }: Readonly<MapLayoutProps>) {
	return (
		<div className="relative z-0">
			{map}
			<div className="absolute top-0 right-0 bottom-0 left-3/4 z-10 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] m-4">
				{children}
			</div>
		</div>
	)
}
