import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return <div className="h-screen w-screen flex items-center justify-center">
		<SignIn redirectUrl={'project/12'} />
	</div>
}
