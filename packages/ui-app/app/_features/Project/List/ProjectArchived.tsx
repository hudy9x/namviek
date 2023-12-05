import { useDebounce } from "@/hooks/useDebounce"
import { projectGet } from "@/services/project"
import { Project } from "@prisma/client"
import { useState } from "react"
import ProjectItem from "./ProjectItem"

export default function ProjectArchived() {
  const [archivedProjects, setArchivedProjects] = useState<Project[]>([])
  useDebounce(() => {
    projectGet({ isArchive: true }).then(res => {

      console.log('-----')
      const { data } = res.data
      console.log(data)
      setArchivedProjects(data)
    })
  }, [])
  if (!archivedProjects.length) return null

  return <div className="mt-4">

    <h2 className="text-lg mb-3 text-gray-500">Archived project</h2>
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
      {archivedProjects.map(project => {
        return (
          <ProjectItem isArchived={true} key={project.id} project={project} />
        )
      })}
    </div>
  </div>
}
