'use client'

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiBarChartFill, RiCalendarFill, RiDashboardFill, RiHomeFill } from "react-icons/ri";
import { IoIosPlayCircle, IoMdLogOut } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Form, Modal } from "@shared/ui";
import UserSection from "./UserSection";
import Button from "packages/shared-ui/src/components/Button";

export default function RootSidebar() {
	const { signOut } = useClerk()
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
				<IoMdLogOut className="main-nav-icon" onClick={() => {
					signOut()
				}} />
			</section>
		</nav>
		<nav className="secondary-sidebar">
			<UserSection/>
			<section className="side-nav">
				<div className="side-title">
					<span>Projects</span>
					<Modal
						title="Create new project"
						triggerBy={<div>
							<HiOutlinePlusSm className="section-icon" />
						</div>}
						content={<div className="flex flex-col gap-4">
							<Form.Input title="Project name" name="title"/>
							<div className="flex justify-end">
								<Modal.Close className="btn btn-primary lg block">
									<span>Create new</span>

								</Modal.Close>

							</div>
						</div>} />

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
