import { dboardComponentCreate } from '@/services/dashboard'
import { useState } from 'react'
import { useOverviewContext } from '../Project/Overview/context'
import { DashboardComponentType, Task, TaskPriority } from '@prisma/client'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'
import { messageError, messageWarning } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useFormik } from 'formik'
import { useTaskStore } from '@/store/task'
import { taskGetByCond } from '@/services/task'

interface UseDboardComponentProps {
  icon?: string
  title?: string
  type: DashboardComponentType
  onSuccess: () => void
}

export interface IDboardComponentFields {
  icon?: string
  title?: string
  type: DashboardComponentType
  assigneeIds: string[]
  statusIds: string[]
  priority: TaskPriority[]
  projectIds: string[]
  date: string[]
  fixed: boolean

  xAxis: string
  series: string
}

const addOperator = (arr: string[] | TaskPriority[], operator: string) => {
  if (!arr.length) return arr
  return [operator, ...arr]
}

export const useDboardComponentSubmit = ({
  title,
  icon,
  type,
  onSuccess
}: UseDboardComponentProps) => {
  const { projectId } = useParams()
  const { tasks } = useTaskStore()
  const { setComponents, dboardId } = useOverviewContext()
  const [sending, setSending] = useState(false)

  const formik = useFormik<IDboardComponentFields>({
    initialValues: {
      icon,
      title,
      type,
      assigneeIds: ['ALL'],
      statusIds: [],
      priority: [],
      projectIds: [],

      xAxis: '',
      series: '',

      date: [],
      fixed: false
    },
    onSubmit: values => {
      createDboardComponent(values)
    }
  })

  const createComponent = (data: { [key: string]: unknown }) => {
    setSending(true)
    dboardComponentCreate(data)
      .then(res => {
        const { status, data } = res.data
        if (status !== 200) {
          setSending(false)
          return
        }

        setComponents(prevComps => [...prevComps, data])
        onSuccess && onSuccess()
        setSending(false)
      })
      .catch(() => {
        setSending(false)
      })
  }

  const createDboardComponent = async (values: IDboardComponentFields) => {
    if (sending) {
      messageWarning('Processing ...')
      return
    }

    if (!dboardId) {
      messageError('You have to create an overview dashboard first')
      return
    }

    // merge projectId into submit values
    const mergedValues = { ...values, projectIds: [projectId] }

    if (!mergedValues.type) {
      return
    }

    let { statusIds, projectIds, priority } = mergedValues
    const date = mergedValues.date
    const title = mergedValues.title
    const type = mergedValues.type
    const xaxis = mergedValues.xAxis
    const series = mergedValues.series

    // xaxis and series must required if type is Column
    if (type === DashboardComponentType.COLUMN) {
      if (!xaxis) {
        formik.setFieldError('xaxis', 'Xaxis is required')
        return
      }
      if (!series) {
        formik.setFieldError('series', 'Series is required')
        return
      }
    }

    // operator and datestring must required if one of them is selected
    if (date.length && (type !== DashboardComponentType.BURNDOWN && type !== DashboardComponentType.BURNUP)) {
      const dateLen = date.filter(Boolean).length
      if (dateLen < 2) {
        messageError('Please input both operator and date')
        return
      }
    }

    // append 'in' operator in front of status, project and priority
    statusIds = addOperator(statusIds, 'in')
    projectIds = addOperator(projectIds, 'in')
    priority = addOperator(priority, 'in') as TaskPriority[]

    // submit custom values for column chart
    if (type === DashboardComponentType.COLUMN) {
      let xAxisAssigneeIds: string[] = []
      let seriesStatusIds: string[] = []
      if (xaxis === 'ASSIGNEE') {
        xAxisAssigneeIds = mergedValues.assigneeIds
      }

      if (series === 'STATUS') {
        seriesStatusIds = statusIds
      }

      const config = {
        projectIds,
        icon: mergedValues.icon,
        date,
        fixed: mergedValues.fixed,
        xAxis: {
          assigneeIds: xAxisAssigneeIds
        },
        series: {
          statusIds: seriesStatusIds
        }
      }

      createComponent({
        dashboardId: dboardId,
        type,
        title,
        config
      })
    }

    if (type === DashboardComponentType.SUMMARY) {
      createComponent({
        dashboardId: dboardId,
        type,
        title,
        config: {
          projectIds,
          statusIds,
          priority,
          icon: mergedValues.icon,
          date,
          fixed: mergedValues.fixed
        }
      })
    }

    if (type === DashboardComponentType.BURNUP || type === DashboardComponentType.BURNDOWN) {
      let assigneeIds: string[] = []
      if (xaxis === 'ASSIGNEE') {
        assigneeIds = mergedValues.assigneeIds
      }

      createComponent({
        dashboardId: dboardId,
        type,
        title,
        config: {
          projectIds,
          date,
          assigneeIds,
        }
      })
    }
  }

  return {
    formik,
    sending
  }
}
