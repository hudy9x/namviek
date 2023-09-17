import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react'
import { Task, TaskPriority, TaskStatus } from '@prisma/client'
import { useProjectStatusStore } from '@/store/status'
import { useMemberStore } from '@/store/member'
import { useTaskStore } from '@/store/task'
import { isSameDay } from 'date-fns'
import { useTaskSelectContext } from '../TaskSelectContext'

export type TGroupType = 'status' | 'assignee' | 'priority' | 'duedate'

export interface IListGroupProps {
  title: string
  style?: React.CSSProperties
  // onEdit?: (v: string) => void
  onCheckAllToggle: () => void
  // onGroupItemToggle: () => void
  isTaskOnGroup: (task: Task) => boolean
  expression: any
  // checked: boolean
}

interface IListModeGroupContext {
  groupType: TGroupType
  onGroupTypeChange: (v: TGroupType) => void
  groups: IListGroupProps[]
}

const ListModeGroupContext = createContext<IListModeGroupContext>(
  {} as IListModeGroupContext
)

export const ListModeGroupProvider = ({
  children
}: React.PropsWithChildren) => {
  const { statuses, updateStatus } = useProjectStatusStore()
  const { tasks, updateTasks } = useTaskStore()
  const { selectedTasks, selectTasks, unselectTasks } = useTaskSelectContext()
  const { members } = useMemberStore()
  const [groupType, setGroupType] = useState<TGroupType>('status')
  const [groups, setGroups] = useState<IListGroupProps[]>(
    [] as IListGroupProps[]
  )

  const handleCheckAllToggleWrapper = useCallback(
    (isTaskOnGroup: (task: Task) => boolean) => (): void => {
      const groupTasks = tasks.filter(isTaskOnGroup)
      // if (!groupTasks.length) return false
      if (!groupTasks.length) return

      const selectedTaskIds = selectedTasks.map(task => task.id)
      const selectedGroupTasks = groupTasks.filter(task =>
        selectedTaskIds.includes(task.id)
      )
      if (selectedGroupTasks.length < groupTasks.length) {
        selectTasks(groupTasks)
        return // true
      } else {
        unselectTasks(groupTasks)
        return // false
      }
    },
    [selectTasks, selectedTasks, tasks, unselectTasks]
  )

  const onGroupTypeChange = useCallback(
    (v: TGroupType) => {
      setGroupType(v)
      let newGroups = [] as IListGroupProps[]
      if (v === 'duedate') {
        const listDuedate = Array.from(new Set(tasks.map(task => task.dueDate)))
        newGroups = listDuedate.map(duedate => {
          const isTaskOnGroup = (task: Task) =>
            !!duedate && !!task.dueDate && isSameDay(task.dueDate, duedate)
          const onCheckAllToggle = handleCheckAllToggleWrapper(isTaskOnGroup)
          return {
            isTaskOnGroup,
            title: duedate ? duedate?.toString() : 'unset',
            onCheckAllToggle,
            expression: duedate
          }
        })
      }
      // TODO: compare to Enum
      if (v === 'priority') {
        const priorities = Object.values(TaskPriority).filter(v =>
          isNaN(Number(v))
        )
        newGroups = priorities.map(priority => {
          const isTaskOnGroup = (task: Task) => task.priority === priority

          // const groupTasks = tasks.filter(task => task.priority === priority)
          // const onEdit = (v: TaskPriority) =>
          //   updateTasks(groupTasks.map(task => ({ ...task, priority: v })))
          const onCheckAllToggle = handleCheckAllToggleWrapper(isTaskOnGroup)
          return {
            title: priority.toString(),
            isTaskOnGroup,
            // onEdit,
            onCheckAllToggle,
            expression: priority
          }
        })
      }
      if (v === 'status') {
        newGroups = [
          ...statuses.map(status => {
            // const title = status.name;
            const { id, name: title, color } = status
            // const onEdit = (v: string) =>
            //   updateStatus(id, { ...status, name: v })
            const isTaskOnGroup = (task: Task) => task.taskStatusId === id
            const onCheckAllToggle = handleCheckAllToggleWrapper(isTaskOnGroup)
            return {
              title,
              // onEdit,
              isTaskOnGroup,
              onCheckAllToggle,
              style: { color },
              expression: id
            }
          })
        ]
      }
      if (v === 'assignee') {
        newGroups = [
          ...members.map(member => {
            const { id, name } = member
            const isTaskOnGroup = (task: Task) => task.assigneeIds.includes(id)
            const onCheckAllToggle = handleCheckAllToggleWrapper(isTaskOnGroup)
            return {
              title: name || 'unassigned',
              isTaskOnGroup,
              onCheckAllToggle,
              expression: id
            }
          })
        ]
      }
      console.log({ newGroups })
      setGroups(newGroups)
    },
    [
      handleCheckAllToggleWrapper,
      members,
      statuses,
      tasks,
      updateStatus,
      updateTasks
    ]
  )

  useEffect(() => {
    onGroupTypeChange('status')
  }, [onGroupTypeChange])

  return (
    <ListModeGroupContext.Provider
      value={{ groupType, onGroupTypeChange, groups }}>
      {children}
    </ListModeGroupContext.Provider>
  )
}

export const useListModeGroupContext = () => {
  return { ...useContext(ListModeGroupContext) }
}
export { ListModeGroupContext }
