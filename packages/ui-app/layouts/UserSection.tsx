import { useUser } from "@clerk/nextjs"

export default function UserSection() {
	
	const {user} = useUser()
	return <section className="flex gap-3 items-center py-3 px-3">
				<img src={user?.imageUrl} className="w-9 h-9 rounded-full" />
				<div className="flex flex-col text-sm">
					<span>{user?.fullName}</span>
					<span className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</span>
				</div>
			</section>
}
