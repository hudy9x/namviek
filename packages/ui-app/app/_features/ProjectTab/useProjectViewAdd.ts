import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectViewType } from '@prisma/client'

export const useProjectViewAdd = () => {
  const { addView } = useProjectViewStore()

  const addProjectView = ({
    name,
    type,
    projectId
  }: {
    name: string
    type: ProjectViewType
    projectId: string
  }) => {
    // addView({ name, type, projectId })
    return projectView.add({ name, type, projectId }).then(res => {
      const { data } = res.data
      addView(data)
    })
  }

  return { addProjectView }
}
