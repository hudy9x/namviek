import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import TaskImport from '@/features/TaskImport'
import { DatePicker } from '@ui-components'
import FormGroup from 'packages/ui-components/src/components/FormGroup'
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { ETaskFilterGroupByType, useTaskFilter } from './context'
import './style.css'
import { useProjectViewList } from '../ProjectView/useProjectViewList'
import { ProjectViewType } from '@prisma/client'
import StatusSelectMultiple from '@/components/StatusSelectMultiple'
import useTaskFilterContext from './useTaskFilterContext'
import { useUser } from '@auth-client'

let timeout = 0
interface ITaskFilterProps {
  searchEnabled?: boolean
  pointEnabled?: boolean
  assigneeEnable?: boolean
  importEnable?: boolean
}

export default function TaskFilter({
  searchEnabled = true,
  pointEnabled = true,
  assigneeEnable = true,
  importEnable = true
}: ITaskFilterProps) {
  const [txt, setTxt] = useState('')
  const { filter, setFilterValue, updateGroupByFilter } = useTaskFilterContext()
  const { currentViewType } = useProjectViewList()
  const { user } = useUser()

  const {
    dateOperator,
    date,
    startDate,
    endDate,
    point,
    priority,
    assigneeIds,
    statusIds
  } = filter

  if (!assigneeIds) {
    console.error(`${assigneeIds} is undefined, use ALL for default`)
  }

  const updatedAssigneeIds = assigneeIds ? assigneeIds.map(uid => {
    if (uid === 'ME' && user?.id) {
      return user.id
    }

    return uid
  }) : ['ALL']

  const isDateRange = date === 'date-range'
  const isCalendarMode = currentViewType === ProjectViewType.CALENDAR
  const isTeamMode = currentViewType === ProjectViewType.TEAM
  const isShowStatusFilter =
    currentViewType === ProjectViewType.CALENDAR ||
    currentViewType === ProjectViewType.BOARD
  const showOperator = ['this-month', 'this-week', 'today']

  const onSearch = (val: string) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      setFilterValue('term', val)
    }, 350) as unknown as number
  }

  return (
    <div className="task-filter">
      <div className="flex items-center gap-2">
      
      </div>

      <div className="task-filter-actions">
      
        <TaskImport />
      </div>
    </div>
  )
}
