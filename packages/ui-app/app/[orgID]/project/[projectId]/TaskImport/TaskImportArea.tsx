import { useTaskStore } from '../../../../../store/task'
import readXlsxFile, { Row } from 'read-excel-file'
import { useMemberStore } from '../../../../../store/member'
import { useProjectStatusStore } from '../../../../../store/status'
import { taskAddMany } from '../../../../../services/task'
import { Button, Modal, messageError } from '@shared/ui'
import { useParams } from 'next/navigation'
import { Task, TaskPriority } from '@prisma/client'
import { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

type ITaskWithoutId = Omit<Task, 'id'>

export default function TaskImportArea() {
  const [visible, setVisible] = useState(false)
  const { addTasks } = useTaskStore()
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()
  const params = useParams()
  const [records, setRecords] = useState<ITaskWithoutId[]>([])

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

    setRecords(newTasks)

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

  const uploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = ['xlsx']
    const file = e.target.files?.[0]

    if (!file) return
    const filename = file.name
    const extension = filename.split('.').pop()?.toLowerCase()
    const isValidExtensions = extension && fileTypes.indexOf(extension) > -1

    if (!isValidExtensions) return

    readXlsxFile(file)
      .then(rows => {
        e.target.value = ''
        console.log('datas', rows)
        if (rows.length > 0) {
          rows.shift()
          _insertTask(rows)
        }
      })
      .catch(error => error)
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-sm text-gray-500">
          The maximum size of upload files are less than 5mb. If you do not have
          any template file,{' '}
          <a className="text-indigo-500 hover:underline hover:cursor-pointer">
            download
          </a>{' '}
          here.
        </p>
      </div>
      <div className="w-full h-[180px] bg-indigo-50/50 border-dashed border-2 flex items-center justify-center rounded-md">
        <div className="text-center text-sm text-gray-400 space-y-2.5">
          <AiOutlineCloudUpload className="inline-flex w-9 h-9 bg-white rounded-md border p-1.5 shadow-sm " />
          <p>
            Drag & drop or{' '}
            <label
              htmlFor="file"
              className="text-indigo-500 hover:underline hover:cursor-pointer">
              choose file
            </label>{' '}
            to upload
          </p>
          <p className="font-medium text-gray-500">XLSX or CSV</p>
        </div>
      </div>
      <input
        type="file"
        name="file"
        id="file"
        className="hidden"
        onChange={e => uploadExcel(e)}
      />
    </>
  )
}
