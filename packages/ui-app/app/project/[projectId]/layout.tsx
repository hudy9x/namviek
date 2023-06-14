import ProjectSidebar from "./ProjectSidebar";

export default function ProjectLayout({children}: {children: React.ReactNode}) {
	return <>
		<ProjectSidebar/>
		<main className="main-content">
			{children}
		</main>
		</> 
}
