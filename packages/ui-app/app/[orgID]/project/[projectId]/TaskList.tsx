import { useTaskStore } from 'packages/ui-app/store/task'
import ListMode from './views/ListMode'
import readXlsxFile, {Row} from 'read-excel-file'
import { useMemberStore } from 'packages/ui-app/store/member'
import { useProjectStatusStore } from 'packages/ui-app/store/status'
import { taskAddMany } from 'packages/ui-app/services/task'
import { messageError } from '@shared/ui'
import { useParams } from 'next/navigation'
import { Task, TaskPriority } from '@prisma/client'

export default function TaskList() {
  const { addTasks } = useTaskStore()
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()
  const params = useParams()
  // console.log({ members })
  // console.log({ statuses })

  const _insertTask = (data: Row[])=> {
    const newTasks = data.map(row => {
      const [
        _projectId,
        _title,
        // member.name is not unique
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

      const newTask: Omit<Task, 'id'> = {
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
      return newTask
    }) as Task[]

    if (newTasks.filter(task => !task).length> 0) {
      messageError('Check the uploading data again!')
      return
    }

    taskAddMany({ data: newTasks, projectId: params.projectId })
      .then(res => {
        const { data, status, error } = res.data
        if (status !== 200) {
          messageError(error)
          return
        }
        addTasks(newTasks)
        // addAllTasks(data)
        console.log(data)
      })
      .catch(err => console.log({ err }))
  }

  const uploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = ['xlsx']
    const file = e.target.files?.[0]
    if (!file) return
    const filename = file.name
    const extension = filename.split('.').pop()?.toLowerCase()

    const isSuccess = extension &&  fileTypes.indexOf(extension) > -1

    if (isSuccess) {
      const datas = await readXlsxFile(file)
        .then(rows => rows)
        .catch(error => error)

      if (datas.length > 0) {
        datas.shift()
        _insertTask(datas)
      }
    }
  }
  return (
    <div>
      <div>
        <form>
          <label htmlFor="file">Tải lên .xlxs</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={e => uploadExcel(e)}
          />
        </form>
      </div>
      <ListMode />
    </div>
  )
}
