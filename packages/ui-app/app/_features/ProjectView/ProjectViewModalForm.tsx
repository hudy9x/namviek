import { ProjectView, ProjectViewType } from '@prisma/client'
import { useProjectViewContext } from './context'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useProjectViewAdd } from './useProjectViewAdd'
import ProjectViewFilterByBoard from '../ProjectViewFilter/BoardFilter'
import ProjectViewFilterByList from '../ProjectViewFilter/ListFilter'
import ProjectViewFilterByCalendar from '../ProjectViewFilter/CalendarFilter'
import ProjectViewFilterByGoal from '../ProjectViewFilter/GoalFilter'
import ProjectViewFilterByTeam from '../ProjectViewFilter/TeamFilter'
import ProjectViewFilterByDashboard from '../ProjectViewFilter/DashboardFilter'
import { Loading, messageError, messageSuccess } from '@shared/ui'
import { useProjectViewUpdateContext } from './updateContext'
import { useProjectViewStore } from '@/store/projectView'
import { projectView } from '@/services/projectView'
import useTaskFilterContext from '../TaskFilter/useTaskFilterContext'

export default function ProjectViewModalForm({
  type,
  name,
  desc
}: {
  type: ProjectViewType
  name: string
  desc: string
}) {
  const { projectId } = useParams()
  const { setVisible, name: viewName, icon, setName, filter, customView, setCustomView } = useProjectViewContext()
  const [loading, setLoading] = useState(false)
  const { addProjectView } = useProjectViewAdd()
  const { isUpdate, updateId } = useProjectViewUpdateContext()
  const { setFilter } = useTaskFilterContext()
  const { updateView } = useProjectViewStore()

  const hideModal = () => {
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      setCustomView(false)
      setName('')
    }, 500)
  }

  const addHandler = () => {
    setLoading(true)
    addProjectView({
      icon,
      name: viewName || name,
      type,
      projectId,
      data: customView ? filter : undefined
    })
      .catch(err => {
        hideModal()
      })
      .finally(() => {
        hideModal()
        setTimeout(() => {
          setLoading(false)
        }, 200)
      })

  }

  const updateHandler = () => {
    const id = updateId
    const dataFilter = filter
    const dataView = filter as unknown as Pick<ProjectView, 'data'>

    updateView(id, {
      icon,
      name: viewName || name,
      type,
      data: customView ? dataView : undefined
    })

    setFilter(filter => ({
      ...filter,
      ...{
        date: dataFilter.date,
        groupBy: dataFilter.groupBy,
        priority: dataFilter.priority,
        statusIds: dataFilter.statusIds,
        point: dataFilter.point
      }
    }))

    hideModal()

    projectView.update({
      id,
      icon,
      type,
      name: viewName,
      data: customView ? dataView : undefined
    }).then(res => {
      console.log(res)
      messageSuccess('Update view successfully')

    }).catch(err => {
      console.log(err)
      messageError("Update view failed !")
    })
  }

  const onAdd = () => {
    if (isUpdate) {
      updateHandler()
      return
    }

    addHandler()
  }

  return (
    <div className="min-h-[500px]">
      <Loading.Absolute enabled={loading} title='Creating view' className='rounded-md' />
      <ProjectViewFilterByBoard type={type} desc={desc} onAdd={onAdd} />
      <ProjectViewFilterByList type={type} desc={desc} onAdd={onAdd} />
      <ProjectViewFilterByCalendar type={type} desc={desc} onAdd={onAdd} />
      <ProjectViewFilterByGoal type={type} desc={desc} onAdd={onAdd} />
      <ProjectViewFilterByTeam type={type} desc={desc} onAdd={onAdd} />
      <ProjectViewFilterByDashboard type={type} desc={desc} onAdd={onAdd} />
    </div>
  )
}
