import { Project } from '@prisma/client'
import { projectUpdate } from './project'
import { useProjectStore } from '@/store/project'

export default function useServiceProject() {
  const { updateProject } = useProjectStore()
  const projectDataUpdate = (data: Partial<Project>) => {
    updateProject(data)
    return projectUpdate(data)
  }

  return {
    projectDataUpdate
  }
}
