'use client'

export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	return <div className="root-container">
		{children}
	</div>
}
