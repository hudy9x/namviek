'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation";

export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	const { isLoaded, organizationList } = useOrganizationList()
	const { push } = useRouter()


	useEffect(() => {
		console.log(organizationList)
		if (!organizationList) {
			push('/organization')
		}
	}, [organizationList])

	return <div className="root-container">
		{children}
	</div>
}
