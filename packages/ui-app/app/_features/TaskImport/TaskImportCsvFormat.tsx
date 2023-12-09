import MemberPicker from '@/components/MemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import { useMemberStore } from '@/store/member'
import { useTaskStore } from '@/store/task'
import { Task, TaskPriority } from '@prisma/client'
import {
  Button,
  DatePicker,
  Form,
  Modal,
  messageError,
  messageSuccess,
  messageWarning,
  setFixLoading
} from '@shared/ui'
import { format } from 'date-fns'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

export default function TaskImportCsvFormat({
  visible,
  setVisible
}: {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const [hide, setHide] = useState(false)
  const [headers, setHeaders] = useState<string[]>([])
  const [taskDatas, setTaskDatas] = useState<Partial<Task>[]>([])
  const { members } = useMemberStore()
  const { tasks } = useTaskStore()
  const { updateTaskData } = useServiceTaskUpdate()

  useEffect(() => {
    if (!visible) {
      setHide(false)
      setTaskDatas([])
      setHeaders([])
    }
  }, [visible])

  const csvToJson = (csv: string) => {
    try {
      // Split the CSV into lines
      const lines = csv.split('\n')

      // Get the header line and split it into an array of column names
      const header = lines[0].split(',')

      setHeaders(header)

      // Initialize an array to hold the JSON objects
      const result = []
      const updateTaskResult: Partial<Task>[] = []

      console.log(lines)

      // Iterate over the lines (starting from the second line, as the first line is the header)
      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',').filter(Boolean)

        if (!currentLine || !currentLine.length) continue

        // Create an object to hold the current line's data
        const obj: {
          [key: string]: string | Date
        } = {}

        const updateTask: Partial<Task> = {}

        // Iterate over each column in the current line
        for (let j = 0; j < header.length; j++) {
          // Use the header names as keys and the current line's values as values
          const headerKey = header[j].replace(/\n/, '').trim()
          const cell = currentLine[j]

          if (headerKey === 'ASSIGNEE') {
            const mem = members.find(m => m.name === cell)
            if (mem && mem.id) {
              // cell = mem.id
              updateTask.assigneeIds = [mem.id]
            }
          }

          if (headerKey === 'TITLE' && cell) {
            const task = tasks.find(t => t.title.trim() === cell.trim())
            if (task) {
              // cell = task.id
              updateTask.id = task.id
              updateTask.title = task.title
            }
          }

          if (headerKey === 'START_DATE') {
            const d = new Date(cell)
            updateTask.startDate = d
            updateTask.plannedStartDate = d
          }

          if (headerKey === 'END_DATE') {
            const d = new Date(cell)
            d.setHours(23)
            updateTask.plannedDueDate = d
            updateTask.dueDate = d
          }

          if (headerKey === 'PRIORITY') {
            updateTask.priority = cell as TaskPriority
          }

          if (headerKey === 'POINT') {
            updateTask.taskPoint = parseInt(cell, 10)
          }

          // if (['START_DATE', 'END_DATE'].includes(headerKey) && cell) {
          //   const d = new Date(cell)
          //   if (headerKey === 'END_DATE') {
          //     d.setHours(23)
          //   }
          //   obj[header[j]] = d
          // } else {
          //   obj[header[j]] = cell
          // }
        }

        updateTaskResult.push(updateTask)

        // Add the object to the result array
        result.push(obj)
      }

      setTaskDatas(updateTaskResult)
      setHide(true)
    } catch (error) {
      messageError('Invalid csv format')
    }
  }

  const onSubmit = () => {
    if (!taskDatas.length) return

    setFixLoading(true)

    const updatePromise: Promise<boolean>[] = []
    taskDatas.forEach(t => {
      if (!t.id) return

      updatePromise.push(updateTaskData(t, false))
    })

    setFixLoading(false)
    setVisible(false)

    Promise.allSettled(updatePromise)
      .then(result => {
        messageSuccess('All data has been updated')
      })
      .catch(err => {
        messageWarning('One of update process has been failed')
      })
  }

  const onInpFile = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.files)
    const files = ev.target.files
    if (!files) return

    const file = files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = function (e) {
      const text = e.target?.result as string
      console.log(text)
      if (!text) return

      csvToJson(text)
    }

    reader.readAsText(file)
  }

  // const data = csvToJson(csv)

  // console.log(csvToJson(csv))

  return (
    <Modal
      size="xl"
      visible={visible}
      onVisibleChange={setVisible}
      title="Insert data using .csv format"
      content={
        <div>
          {hide ? (
            <Button
              title="Input csv"
              onClick={() => {
                setHide(false)
                setTaskDatas([])
              }}
            />
          ) : (
            <>
              <Form.Input
                type="file"
                className="mb-3 hidden"
                onChange={onInpFile}
              />
              <Form.Textarea
                placeholder="Paste your csv content here"
                onChange={ev => {
                  const value = ev.target.value

                  if (!value) {
                    messageError('No value')
                    return
                  }

                  csvToJson(value)
                }}
              />
            </>
          )}
          <div className="mt-3">
            {taskDatas.length ? (
              <div className="space-y-2 bg-indigo-50/50  dark:bg-gray-800 p-3 rounded-md shadow-inner shadow-indigo-100 dark:shadow-gray-800">
                {taskDatas.map((t, tindex) => {
                  const {
                    plannedStartDate,
                    plannedDueDate,
                    dueDate,
                    priority,
                    assigneeIds,
                    taskPoint
                  } = t
                  const pStartDate = plannedStartDate
                    ? format(new Date(plannedStartDate), 'PP')
                    : null
                  const pEndDate = plannedDueDate
                    ? format(new Date(plannedDueDate), 'PP')
                    : null

                  return (
                    <div
                      key={tindex}
                      className="flex items-center justify-between">
                      <div>{t.title}</div>
                      <div className="flex items-center gap-2 ">
                        <div>
                          <MemberPicker
                            value={assigneeIds ? assigneeIds[0] : ''}
                          />
                        </div>
                        <div>
                          <DatePicker
                            value={
                              plannedStartDate
                                ? new Date(plannedStartDate)
                                : undefined
                            }
                          />
                        </div>
                        <div>
                          <DatePicker
                            value={
                              plannedDueDate
                                ? new Date(plannedDueDate)
                                : undefined
                            }
                          />
                        </div>
                        <div>
                          <Form.Input
                            readOnly
                            className="w-[50px] text-center"
                            value={taskPoint + ''}
                          />
                        </div>
                        <div>
                          <PrioritySelect value={priority as TaskPriority} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
          <div className="flex flex-row-reverse gap-3 mt-3">
            <Button primary title="Import" onClick={onSubmit} />
            <Button title="Cancel" onClick={() => setVisible(false)} />
          </div>
        </div>
      }
    />
  )
}
