import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectViewType } from '@prisma/client'
import { IBoardFilter } from './context'

export const useProjectViewAdd = () => {
  const { addView } = useProjectViewStore()

  const addProjectView = ({
    icon,
    name,
    type,
    projectId,
    data
  }: {
    icon: string
    name: string
    type: ProjectViewType
    projectId: string
    data?: IBoardFilter
  }) => {

    const filter = data ? {
      date: data.date,
      priority: data.priority,
      point: data.point,
      statusIds: data.statusIds,
      groupBy: data.groupBy
    } : null

    // addView({ name, type, projectId })
    return projectView.add({ icon, name, type, projectId, data: filter }).then(res => {
      const { data } = res.data
      addView(data)
    })
  }

  return { addProjectView }
}
