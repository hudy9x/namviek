import { ProjectView, ProjectViewType } from '@prisma/client'
import { IBoardFilter, useProjectViewContext } from './context'

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
import { useReRenderView } from './useReRenderView'
import { projectViewMap } from './useProjectViewList'
import { useUser } from '@goalie/nextjs'

export default function ProjectViewModalForm({
  type,
  name,
  desc
}: {
  type: ProjectViewType
  name: string
  desc: string
}) {
  const { user } = useUser()
  const { projectId } = useParams()
  const { setVisible, name: viewName, icon, onlyMe, setOnlyMe, setName, filter, customView, setCustomView } = useProjectViewContext()
  const [loading, setLoading] = useState(false)
  const { addProjectView } = useProjectViewAdd()
  const { isUpdate, updateId } = useProjectViewUpdateContext()
  const { setFilter } = useTaskFilterContext()
  const { updateView } = useProjectViewStore()
  const { doReRender } = useReRenderView()

  const hideModal = () => {
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      setCustomView(false)
      setOnlyMe(false)
      setName('')
    }, 500)
  }

  const replaceUidToRelativeValue = (filter: IBoardFilter) => {
    const cloneFilter = { ...filter }

    if (type === ProjectViewType.GOAL) {
      cloneFilter.assigneeIds = ['ALL']
    } else {
      cloneFilter.assigneeIds = cloneFilter.assigneeIds.map(uid => {
        if (user?.id === uid) {
          return "ME"
        }

        return uid
      })
    }


    return cloneFilter
  }

  const addHandler = () => {

    // setLoading(false)
    const newFilter = replaceUidToRelativeValue(filter)
    const isCustomView = customView || type === ProjectViewType.GOAL

    addProjectView({
      onlyMe: onlyMe || false,
      icon,
      name: viewName || name,
      type,
      projectId,
      data: isCustomView ? newFilter : undefined
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
    const newDataFilter = replaceUidToRelativeValue(filter)
    const dataView = filter as unknown as Pick<ProjectView, 'data'>

    updateView(id, {
      onlyMe: onlyMe || false,
      icon,
      name: viewName || name,
      type,
      data: customView ? dataView : undefined
    })

    // only re-render view if type changed
    const oldType = projectViewMap.get(id)
    if (oldType !== type) {
      doReRender()
    }

    // update project filter
    setFilter(filter => ({
      ...filter,
      ...{
        date: newDataFilter.date,
        groupBy: newDataFilter.groupBy,
        priority: newDataFilter.priority,
        statusIds: newDataFilter.statusIds,
        point: newDataFilter.point,
        assigneeIds: newDataFilter.assigneeIds
      }
    }))

    hideModal()

    projectView.update({
      id,
      icon,
      onlyMe: onlyMe || false,
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

  const onSubmit = () => {
    setLoading(true)
    if (isUpdate) {
      updateHandler()
      return
    }

    addHandler()
  }

  return (
    <div className="min-h-[500px]">
      <Loading.Absolute enabled={loading} title={isUpdate ? 'Updating view...' : 'Creating view...'} className='rounded-md' />
      <ProjectViewFilterByBoard type={type} isUpdate={isUpdate} desc={desc} onAdd={onSubmit} />
      <ProjectViewFilterByList type={type} isUpdate={isUpdate} desc={desc} onAdd={onSubmit} />
      <ProjectViewFilterByCalendar type={type} isUpdate={isUpdate} desc={desc} onAdd={onSubmit} />
      <ProjectViewFilterByGoal type={type} isUpdate={isUpdate} desc={desc} onAdd={onSubmit} />
      <ProjectViewFilterByTeam type={type} isUpdate={isUpdate} desc={desc} onAdd={onSubmit} />
      <ProjectViewFilterByDashboard type={type} isUpdate={isUpdate} desc={desc} onAdd={onSubmit} />
    </div>
  )
}
