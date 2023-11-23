import { useMemberStore } from '@/store/member'
import { useTaskStore } from '@/store/task'
import { Form, Modal } from '@shared/ui'
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
  const { members } = useMemberStore()
  const { tasks } = useTaskStore()

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

    console.log(header)

    setHeaders(header)

    // Initialize an array to hold the JSON objects
    const result = []

    // Iterate over the lines (starting from the second line, as the first line is the header)
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',')

      // Create an object to hold the current line's data
      const obj: {
        [key: string]: string
      } = {}

      // Iterate over each column in the current line
      for (let j = 0; j < header.length; j++) {
        // Use the header names as keys and the current line's values as values
        const headerKey = header[j]
        let cell = currentLine[j]

        if (headerKey === 'ASSIGNEE') {
          console.log(cell)
          const mem = members.find(m => m.name === cell)
          if (mem && mem.id) {
            cell = mem.id
          }
        }

        if (headerKey === 'TITLE') {
          const task = tasks.find(t => t.title.trim() === cell.trim())
          if (task) {
            cell = task.id
          }
        }

        if (['START_DATE', 'END_DATE'].includes(headerKey)) {
          // cell = new Date()
        }

        obj[header[j]] = cell
      }

      // Add the object to the result array
      result.push(obj)
    }

    return result
  }

  console.log(headers)

  // const data = csvToJson(csv)

  // console.log(csvToJson(csv))

  return (
    <Modal
      size="lg"
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
              {headers.map((h, hIndex) => {
                return <div key={hIndex}>{h}</div>
              })}
            </div>
            <div></div>
          </div>
        </div>
      }
    />
  )
}
