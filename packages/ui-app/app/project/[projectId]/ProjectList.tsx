'use client'

import Link from "next/link";
import { useProjectStore } from "packages/ui-app/store/project";
import { useEffect } from "react";
import { useServiceProject } from "../../services/project";

export default function ProjectList() {
	const { getProjects } = useServiceProject()
	const {projects, addAllProject} = useProjectStore(state => state)


	console.log('project', projects)


	useEffect(() => {
		console.log('get all projects')
		getProjects().then(res => res.json()).then(result => {
			const {data, status} = result

			if (status !== 200) return;

			addAllProject(data)

		})
	}, [])

	return <nav>
		{projects.map(project => {
			return <Link key={project.id}
				href={`/project/${project.id}`}>
				<span className="nav-icon">👕</span>
				<span>{project.name}</span></Link>
		})}
	</nav>
}
