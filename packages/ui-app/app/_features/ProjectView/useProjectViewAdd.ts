import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectViewType } from '@prisma/client'
import { IBoardFilter } from './context'

export const useProjectViewAdd = () => {
  const { addView } = useProjectViewStore()

  const addProjectView = ({
    name,
    type,
    projectId,
    data
  }: {
    name: string
    type: ProjectViewType
    projectId: string
    data?: IBoardFilter
  }) => {

    const filter = data ? {
      date: data.date,
      priority: data.priority,
      point: data.point,
      groupBy: data.groupBy
    } : null

    // addView({ name, type, projectId })
    return projectView.add({ name, type, projectId, data: filter }).then(res => {
      const { data } = res.data
      addView(data)
    })
  }

  return { addProjectView }
}
