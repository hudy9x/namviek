import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiBarChartFill, RiCalendarFill, RiDashboardFill, RiHomeFill, RiNotificationFill } from "react-icons/ri";
import { IoIosPlayCircle, IoMdLogOut } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";

export default function RootSidebar() {
	const { user } = useUser()
	const pathname = usePathname()

	if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
		return null
	}

	return <aside className="root-sidebar">
		<nav className="primary-sidebar">
			<section>
				<Link href="/home"><RiHomeFill className="main-nav-icon" /></Link>
				<Link href="/home"><RiDashboardFill className="main-nav-icon active" /></Link>
				<Link href="/home"><RiCalendarFill className="main-nav-icon" /></Link>
				<Link href="/home"><RiBarChartFill className="main-nav-icon" /></Link>
				<Link href="/home"><IoIosPlayCircle className="main-nav-icon" /></Link>
			</section>
			<section>
				<Link href="/home"><IoMdLogOut className="main-nav-icon" /></Link>
			</section>
		</nav>
		<nav className="secondary-sidebar">
			<section className="flex gap-3 items-center py-3 px-3">
				<UserButton afterSignOutUrl='/sign-in' />
				<div className="flex flex-col text-sm">
					<span>{user?.fullName}</span>
					<span className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</span>
				</div>
			</section>

			<section className="side-nav">
				<h2><span>Projects</span> <HiOutlinePlusSm className="section-icon"/> </h2>
				<nav>
					<Link href="/home"><span className="nav-icon">👕</span> <span>Printgrows</span></Link>
					<Link href="/home"><span className="nav-icon">👕</span> <span>Enorm.ai</span></Link>
					<Link href="/home"><span className="nav-icon">👕</span> <span>Remockup</span></Link>
				</nav>
			</section>

			{/* <section className="side-nav"> */}
			{/* 	<h2>Saved filters</h2> */}
			{/* 	<nav> */}
			{/* 		<Link href="/project/1"> */}
			{/* 			<span className="nav-icon">👕</span> */}
			{/* 			<span>10/2023</span> */}
			{/* 		</Link> */}
			{/* 	</nav> */}
			{/* </section> */}
		</nav>

	</aside>
}
