'use client'

import Link from "next/link";
import { useProjectStore } from "../../store/project";
import { useEffect } from "react";
import { useServiceProject } from "../../services/project";
import { useParams } from "next/navigation";
import { Project } from "@prisma/client";

export default function ProjectList() {
	const { getProjects } = useServiceProject()
	const { projects, addAllProject, selectProject } = useProjectStore(state => state)

	const params = useParams()

	const onSelectProject = (id: string) => {
		selectProject(id)
	}

	useEffect(() => {
		console.log('get all projects')
		// getProjects().then(res => res.json()).then(result => {
		// 	const { data, status } = result
		// 	const projects = data as Project[]
		//
		// 	if (status !== 200) return;
		//
		// 	addAllProject(data)
		// 	projects.some(p => {
		// 		if (p.id === params.projectId) {
		// 			onSelectProject(p.id)
		// 			return true;
		// 		}
		// 	})
		// 	
		//
		// })
	}, [])


	return <nav className="nav">
		{projects.map(project => {
			const active = params.projectId === project.id
			return <Link key={project.id} className={`${active ? "active" : ""} nav-item`}
				onClick={() => {
onSelectProject(project.id)
				}}
				href={`/project/${project.id}`}>
				<span className="nav-icon">👕</span>
				<span>{project.name}</span></Link>
		})}
	</nav>
}
