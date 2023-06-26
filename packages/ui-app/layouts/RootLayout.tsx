'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation";

export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	const { push } = useRouter()


	return <div className="root-container">
		{children}
	</div>
}
