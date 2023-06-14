'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserSection from "../../../layouts/UserSection";
import RootSidebar from "../../../layouts/RootSidebar";
import ProjectAdd from "./ProjectAdd";

export default function ProjectSidebar() {
	const pathname = usePathname()

	if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
		return null
	}

	return <aside className="root-sidebar">
		<RootSidebar/>
		<nav className="secondary-sidebar">
			<UserSection/>
			<section className="side-nav">
				<div className="side-title">
					<span>Projects</span>
					<ProjectAdd/>
				</div>
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
