import { Row } from 'read-excel-file'
import { useMemberStore } from '../../../../../store/member'
import { useProjectStatusStore } from '../../../../../store/status'
import { messageError } from '@shared/ui'
import { Task, TaskPriority } from '@prisma/client'

type ITaskWithoutId = Omit<Task, 'id'>

export default function TaskImportPreview({ rows }: { rows: Row[] }) {
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()

  const _insertTask = (data: Row[]) => {
    const newTasks: ITaskWithoutId[] = []
    data.forEach(row => {
      const [
        _projectId,
        _title,
        _assigneeIds,
        _dueDate,
        _priority,
        _taskPoint,
        _taskStatusId,
        ..._
      ] = row.map(cell => (cell ? String(cell) : null))

      const projectId = _projectId
      const title = _title
      const assigneeIds =
        members
          .filter(
            member =>
              member?.name &&
              _assigneeIds
                ?.split(',')
                .map(s => s.trim())
                .includes(member.name.trim())
          )
          .map(member => member.id) || null
      const dueDate = _dueDate ? new Date(_dueDate) : null
      const priority = (_priority &&
        Object.keys(TaskPriority).includes(_priority.toUpperCase()) &&
        _priority.toUpperCase()) as TaskPriority
      const taskPoint = _taskPoint ? parseInt(_taskPoint) : null
      const taskStatusId = _taskStatusId
        ? statuses.filter(
            status => status.name.trim() === _taskStatusId.trim()
          )?.[0]?.id
        : null

      if (title === null) {
        messageError('Task Name has to be string')
        return
      }
      if (projectId === null) {
        messageError('Project ID has to be string')
        return
      }

      const newTask: ITaskWithoutId = {
        title,
        desc: null,
        dueDate,
        startDate: null,
        projectId,
        priority,
        taskStatusId,
        tagIds: [],
        // member.name is not unique
        assigneeIds,
        parentTaskId: null,
        taskPoint,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null
      }

      newTasks.push(newTask)
    })

    if (newTasks.filter(task => !task).length > 0) {
      messageError('Check the uploading data again!')
      return
    }

    if (!newTasks || !newTasks.length) return

    // setRecords(newTasks)

    // taskAddMany({ data: newTasks, projectId: params.projectId })
    //   .then(res => {
    //     const { data, status, error } = res.data
    //     if (status !== 200) {
    //       messageError(error)
    //       return
    //     }
    //     addTasks(newTasks)
    //     // addAllTasks(data)
    //     console.log(data)
    //   })
    //   .catch(err => console.log({ err }))
  }

  return (
    <table className="w-full border-spacing-2">
      <tbody className="divide-y">
        {rows.map((row, idx) => {
          const [title, assignee, taskpoint] = row.map(r => r.toString())
          return (
            <tr key={idx} className="divide-x text-xs text-gray-500">
              <td>{title}</td>
              <td>{assignee}</td>
              <td>{taskpoint}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
