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
import TaskImportPreview from './TaskImportPreview'
import { createContext } from 'react'

type ITaskWithoutId = Omit<Task, 'id'>

const ImportContext = createContext({
  rows: [],
  setRows: (rows: Row[]) => {
    console.log(rows)
  }
})
const TaskImportProvider = ImportContext.Provider

export default function TaskImport() {
  const [visible, setVisible] = useState(false)
  const { addTasks } = useTaskStore()
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()
  const params = useParams()
  const [records, setRecords] = useState<ITaskWithoutId[]>([])

  const [rows, setRows] = useState<Row[]>([])

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
          setRows(rows)

          // _insertTask(rows)
        }
      })
      .catch(error => error)
  }

  const listView = !rows.length

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Import new tasks"
        className={records.length ? 'task-import-modal' : ''}
        triggerBy={
          <Button leadingIcon={<AiOutlineCloudUpload />} title="Import" />
        }
        content={
          <div>
            {listView ? (
              <>
                <div className="mb-3">
                  <p className="text-sm text-gray-500">
                    The maximum size of upload files are less than 5mb. If you
                    do not have any template file,{' '}
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
            ) : null}

            <TaskImportPreview rows={rows} />

            <div className="flex items-center justify-end mt-3">
              <div className="space-x-3">
                <Button title="Cancel" />
                <Button title="Import" primary />
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}
