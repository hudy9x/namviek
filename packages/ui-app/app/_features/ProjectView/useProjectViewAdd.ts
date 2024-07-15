import { projectView } from '@/services/projectView'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectViewType } from '@prisma/client'
import { IBoardFilter } from './context'

export const useProjectViewAdd = () => {
  const { addView } = useProjectViewStore()

  const addProjectView = ({
    onlyMe,
    icon,
    name,
    type,
    projectId,
    data
  }: {
    onlyMe: boolean
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
      assigneeIds: data.assigneeIds,
      groupBy: data.groupBy
    } : null


    return projectView
      .add({ icon, onlyMe, name, type, projectId, data: filter })
      .then(res => {
        const { data } = res.data
        addView(data)
      })
  }

  return { addProjectView }
}
