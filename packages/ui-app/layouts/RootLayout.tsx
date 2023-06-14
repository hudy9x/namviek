'use client'

import { useAuth } from "@clerk/nextjs"
import { saveClerkToken } from "../app/services/_rq"
import { useEffect } from "react"

export default function RootLayoutComp({ children }: { children: React.ReactNode }) {
	const { getToken } = useAuth()

	const saveToken = async () => {
		console.log('called save token')
		const token = await getToken()

		console.log('get token', token)

		saveClerkToken(token + '')

	}

	useEffect(() => {
		console.log('called')
		saveToken()
	}, [])

	return <div className="root-container">
		{children}
	</div>
}
