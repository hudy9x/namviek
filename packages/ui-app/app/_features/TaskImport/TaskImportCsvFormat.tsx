import MemberPicker from '@/components/MemberPicker'
import PrioritySelect from '@/components/PrioritySelect'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import { useMemberStore } from '@/store/member'
import { useTaskStore } from '@/store/task'
import { Task, TaskPriority } from '@prisma/client'
import { Button, DatePicker, Form, Modal, setFixLoading } from '@shared/ui'
import { format } from 'date-fns'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function TaskImportCsvFormat({
  visible,
  setVisible
}: {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const [csv, setCsv] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [taskDatas, setTaskDatas] = useState<Partial<Task>[]>([])
  const { members } = useMemberStore()
  const { tasks } = useTaskStore()
  const { updateTaskData } = useServiceTaskUpdate()

  useEffect(() => {
    if (!visible) {
      setHeaders([])
    }
  }, [visible])

  const csvToJson = (csv: string) => {
    // Split the CSV into lines
    const lines = csv.split('\n')

    // Get the header line and split it into an array of column names
    const header = lines[0].split(',')

    setHeaders(header)

    // Initialize an array to hold the JSON objects
    const result = []
    const updateTaskResult: Partial<Task>[] = []

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
        const headerKey = header[j]
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

    return result
  }

  const onSubmit = () => {
    if (!taskDatas.length) return

    setFixLoading(true)

    taskDatas.forEach(t => {
      if (!t.id) return

      updateTaskData(t)

    })

    setTimeout(() => {
      setFixLoading(false)
    }, 2000)
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
          <Form.Textarea
            onChange={ev => {
              const result = csvToJson(ev.target.value)
              console.log(result)
            }}
          />
          <div>
            <div>
              {taskDatas.map((t, tindex) => {
                const {
                  plannedStartDate,
                  plannedDueDate,
                  dueDate,
                  priority,
                  assigneeIds
                } = t
                const pStartDate = plannedStartDate
                  ? format(new Date(plannedStartDate), 'PP')
                  : null
                const pEndDate = plannedDueDate
                  ? format(new Date(plannedDueDate), 'PP')
                  : null

                return (
                  <div key={tindex} className="flex items-center">
                    <div>{t.title}</div>
                    <div>
                      <MemberPicker value={assigneeIds ? assigneeIds[0] : ''} />
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
                          plannedDueDate ? new Date(plannedDueDate) : undefined
                        }
                      />
                    </div>
                    <div>
                      <PrioritySelect value={priority as TaskPriority} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-row-reverse gap-3">
            <Button primary title="Import" onClick={onSubmit} />
            <Button title="Cancel" onClick={() => setVisible(false)} />
          </div>
        </div>
      }
    />
  )
}
