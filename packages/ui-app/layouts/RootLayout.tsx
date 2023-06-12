'use client'

import RootSidebar from "./RootSidebar";

export default function RootLayoutComp({ children }: { children: React.ReactNode }) {


	return <div className="root-container">
		<RootSidebar/>
		<main className="main-content">
			{children}
		</main>
	</div>
}
