import MemberPicker from '@/components/MemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { TaskPriority } from '@prisma/client'
import { Button, DatePicker } from '@shared/ui'
import { useState } from 'react'
import { useMultipleUpdate, defaultData } from './useMultipleUpdate'
import { useEscapeKeyPressed } from '@/hooks/useEscapeKeyPressed'
import { useMultipleDelete } from './useMultipleDelete'

export default function TaskMultipleActions() {
  const [data, setData] = useState(structuredClone({ ...defaultData }))
  const { onUpdate, hasSelected, selected, clearAllSelected } = useMultipleUpdate()
  const { onDeleteMany } = useMultipleDelete()

  const updateFieldValue = (
    name: keyof typeof data,
    val: string | Date | TaskPriority
  ) => {
    setData(dt => ({ ...dt, [name]: val }))
  }

  useEscapeKeyPressed(() => {
    onClose()
  }, function unmount() {
    onClose()
  })

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
          value={data.date}
          placeholder="--/--/--"
          onChange={val => {
            // setFilterValue('startDate', val)
            updateFieldValue('date', val)
          }}
        />

        <StatusSelect
          value={data.status}
          onChange={val => {
            updateFieldValue('status', val)
          }}
          className="sm:w-[150px]"
        />

        <PointSelect
          value={data.point}
          onChange={val => {
            updateFieldValue('point', val)
          }}
        />

        <PrioritySelect
          width={130}
          value={data.priority}
          onChange={val => {
            updateFieldValue('priority', val)
          }}
        />

        <MemberPicker
          value={data.assignee}
          onChange={val => {
            updateFieldValue('assignee', val)
          }}
          className="task-filter-member-picker"
        />
        <Button title="Update" primary onClick={onUpdate} />
        <Button title="Delete" danger onClick={onClose} />
        <Button title="Close" onClick={onClose} />
      </div>
    </div>
  )
}
