import MemberPicker from '@/components/MemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { TaskPriority } from '@prisma/client'
import { Button, DatePicker } from '@shared/ui'
import { useMultipleUpdate, defaultData } from './useMultipleUpdate'
import { useEscapeKeyPressed } from '@/hooks/useEscapeKeyPressed'
import TaskTypeSelect from '@/components/TaskTypeSelect'

export default function TaskMultipleActions() {
  const { onUpdate, hasSelected, selected, clearAllSelected, data, setData } =
    useMultipleUpdate()
  // const { onDeleteMany } = useMultipleDelete()
  const { date, point, assignee, status, priority, type } = data

  const updateFieldValue = (
    name: keyof typeof data,
    val: string | Date | TaskPriority
  ) => {
    setData(dt => ({ ...dt, [name]: val }))
  }

  useEscapeKeyPressed(
    () => {
      onClose()
    },
    function unmount() {
      onClose()
    }
  )

  // const onDeleteAction = () => {
  //   onDeleteMany()
  //   onClose()
  // }

  const onClose = () => {
    clearAllSelected()
    setData(structuredClone({ ...defaultData }))
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full py-3 border-b border-color-base bg-base shadow-lg transition-all z-40 ${hasSelected
          ? '-translate-y-0 shadow-color-base'
          : '-translate-y-full shadow-transparent'
        }`}>
      <div className="w-full grid grid-cols-2 px-4 sm:flex sm:items-center justify-center gap-2 text-sm">
        <span className="btn">Selected: {selected.length}</span>
        <DatePicker
          value={date}
          placeholder="--/--/--"
          onChange={val => {
            // setFilterValue('startDate', val)
            updateFieldValue('date', val)
          }}
        />

        <StatusSelect
          value={status}
          onChange={val => {
            updateFieldValue('status', val)
          }}
          className="sm:w-[150px]"
        />

        <TaskTypeSelect
          width={180}
          value={type}
          onChange={val => {
            updateFieldValue('type', val)
          }}
        />

        <PointSelect
          value={point}
          onChange={val => {
            updateFieldValue('point', val)
          }}
        />

        <PrioritySelect
          width={130}
          value={priority}
          onChange={val => {
            updateFieldValue('priority', val)
          }}
        />

        <MemberPicker
          value={assignee}
          onChange={val => {
            updateFieldValue('assignee', val)
          }}
          className="task-filter-member-picker"
        />
        <Button title="Update" primary onClick={onUpdate} />
        {/* <Button title="Delete" danger onClick={onDeleteAction} /> */}
        <Button title="Close" onClick={onClose} />
      </div>
    </div>
  )
}
