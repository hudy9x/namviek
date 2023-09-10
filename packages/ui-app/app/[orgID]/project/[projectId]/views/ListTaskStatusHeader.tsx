import TaskCheckAll from './TaskCheckAll'
import ListCell from './ListCell'
import { useProjectStatusStore } from '@/store/status'
import { useCallback, useState } from 'react'
import {
  Button,
  DatePickerBorderless,
  messageError,
  messageSuccess
} from '@shared/ui'
import MemberPicker from '@/components/MemberPicker'
import { Task, TaskStatus } from '@prisma/client'
import PrioritySelect from '@/components/PrioritySelect'
import TaskPoint from './TaskPoint'
import PointSelect from '@/components/PointSelect'
import { tasksUpdateByStatus } from '@/services/task'
import { useTaskStore } from '@/store/task'

export default function ListTaskStatusHeader({
  status,
  onCheckedChange
}: {
  status: TaskStatus
  onCheckedChange: (v: boolean) => void
}) {
  const { name: statusName, id: statusId } = status
  const { updateTasksByStatus } = useTaskStore()
  const { statusLoading } = useProjectStatusStore()
  const [editing, setEditing] = useState(false)
  const [item, setItem] = useState({} as Task)

  const handleCheckedChange = useCallback(
    (v: boolean) => {
      onCheckedChange(v)
      setEditing(v)
    },
    [onCheckedChange]
  )
  const handleSubmit = () => {
    updateTasksByStatus(statusId, item)
    tasksUpdateByStatus(statusId, {
      ...item,
      taskPoint: item.taskPoint ? parseInt(item.taskPoint, 10) : null
    })
      .then(result => {
        const { status } = result
        if (status !== 200) {
          messageError('update error')
          return
        }
        messageSuccess('update success')
      })
      .catch(error => {
        console.log(error)
        messageError('update error')
      })
    setItem({} as Task)
  }

  const updateField = (name: keyof Task) => (value: any) =>
    setItem(prev => ({ ...prev, [name]: value }))

  return (
    <div className="px-3 py-2 border-b top-[45px] bg-white rounded-t-md flex items-center justify-between z-10">
      <div className="flex gap-2 items-center text-xs uppercase font-bold">
        <TaskCheckAll onChange={handleCheckedChange} />
        <div className={`status-name ${statusLoading ? 'loading' : ''}`}>
          {statusName}
        </div>
      </div>
      {editing ? (
        <div className="flex relative items-center gap-3 text-xs uppercase font-medium text-gray-500">
          {/* <ListCell width={150}>{renderInput('assignee', true)}</ListCell> */}
          <ListCell width={150}>
            <MemberPicker
              onChange={v => updateField('assigneeIds')([v])}
              className="task-assignee"
            />
          </ListCell>
          <ListCell width={75}>
            <PrioritySelect
              value={item.priority || 'LOW'}
              onChange={updateField('priority')}
              className="task-priority"
            />
          </ListCell>
          <ListCell width={50}>
            <PointSelect
              onChange={updateField('taskPoint')}
              className="task-point"
            />
          </ListCell>
          <ListCell width={110}>
            <DatePickerBorderless
              value={item.dueDate || undefined}
              placeholder="--/--/--"
              onChange={updateField('dueDate')}
              className="task-date"
            />
          </ListCell>
          <ListCell width={100}>
            <Button
              title="Save"
              type="submit"
              primary
              size="sm"
              onClick={handleSubmit}
            />
          </ListCell>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
          <ListCell width={150}>Assignee</ListCell>
          <ListCell width={75}>Priority</ListCell>
          <ListCell width={50}>Point</ListCell>
          <ListCell width={110}>Duedate</ListCell>
          <ListCell width={100}>Created by</ListCell>
        </div>
      )}
    </div>
  )
}
