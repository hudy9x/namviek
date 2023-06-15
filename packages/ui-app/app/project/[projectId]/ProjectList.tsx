import Link from "next/link";
import { useProjectStore } from "packages/ui-app/store/project";
import { useEffect } from "react";
import { useServiceProject } from "../../services/project";

export default function ProjectList() {
	const { getProjects, addAllProject } = useServiceProject()
	const projects = useProjectStore(state => state.projects)


	useEffect(() => {
		getProjects().then(res => res.json()).then(result => {
			console.log(result)

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
