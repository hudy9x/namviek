import { projectGet } from '@/services/project'
import { useProjectStore } from '@/store/project'
import { useEffect } from 'react'
import ProjectItem from './ProjectItem'

export default function ProjectAvailable() {
  const { projects, addAllProject } = useProjectStore(state => state)

  useEffect(() => {
    if (!projects.length) {
      projectGet({
        isArchive: false
      }).then(result => {
        const { data, status } = result.data
        // const projects = data as Project[]
        if (status !== 200) return

        addAllProject(data)
      })
    }
  }, [JSON.stringify(projects)])
  return (
    <div>
      <h2 className="text-lg mb-3 text-gray-500">Select one to go</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {projects.map(project => {
          return <ProjectItem key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}
