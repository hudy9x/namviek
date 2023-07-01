'use client'

import { usePathname } from "next/navigation";
import UserSection from "../../layouts/UserSection";
import RootSidebar from "../../layouts/RootSidebar";
import ProjectAdd from "./ProjectAdd";
import ProjectList from "./ProjectList";

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
				<ProjectList/>
			</section>

		</nav>

	</aside>
}
