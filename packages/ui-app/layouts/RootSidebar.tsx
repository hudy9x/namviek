'use client'

import Link from "next/link";
import { RiBarChartFill, RiCalendarFill, RiDashboardFill, RiHomeFill } from "react-icons/ri";
import { IoIosPlayCircle, IoMdLogOut } from "react-icons/io";

export default function RootSidebar() {
	return <nav className="primary-sidebar">
		<section>
			<Link href="/home"><RiHomeFill className="main-nav-icon" /></Link>
			<Link href="/home"><RiDashboardFill className="main-nav-icon active" /></Link>
			<Link href="/home"><RiCalendarFill className="main-nav-icon" /></Link>
			<Link href="/home"><RiBarChartFill className="main-nav-icon" /></Link>
			<Link href="/home"><IoIosPlayCircle className="main-nav-icon" /></Link>
		</section>
		<section>
			<IoMdLogOut className="main-nav-icon" onClick={() => {
			}} />
		</section>
	</nav>
}
