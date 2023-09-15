import { Button } from '@shared/ui'
import { useTaskImport } from './context'
import { useState } from 'react'
import TaskImportAction from './TaskImportAction'
import TaskImportStep from './TaskImportStep'

export default function TaskImportPreview() {
  const { rows } = useTaskImport()

  const maxItem = 20
  const totalPage = Math.ceil(rows.length / maxItem)
  const [page, setPage] = useState(1)

  const skip = page > 1 ? (page - 1) * maxItem : 0
  const take = page > 1 ? maxItem * page : maxItem
  const currentPageData = rows.slice(skip, take)
  const startIndex = page > 1 ? (page - 1) * maxItem : 0

  return (
    <>
      <div className="relative">
        <TaskImportStep />
        <table className="w-full border dark:border-gray-700">
          <thead className="border-b dark:border-gray-700 text-sm">
            <tr className="divide-x dark:divide-gray-700 dark:text-gray-400">
              <th className="icell">#</th>
              <th className="icell">Project</th>
              <th className="icell">Task name</th>
              <th className="icell">Assignee</th>
              <th className="icell">Due date</th>
              <th className="icell">Priority</th>
              <th className="icell">Point</th>
              <th className="icell">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {currentPageData.map((row, idx) => {
              const [
                project,
                title,
                assignee,
                duedate,
                priority,
                taskpoint,
                status
              ] = row.map(r => (r ? r.toString() : ''))
              return (
                <tr
                  key={idx}
                  className="irow divide-x dark:divide-gray-700 text-xs text-gray-600 dark:text-gray-400">
                  <td className="icell">{startIndex + idx + 1}</td>
                  <td className="icell">{project}</td>
                  <td className="icell">{title}</td>
                  <td className="icell">{assignee}</td>
                  <td className="icell">{duedate}</td>
                  <td className="icell">{priority}</td>
                  <td className="icell">{taskpoint}</td>
                  <td className="icell">{status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mt-3">
          <div className="space-x-2">
            <Button
              disabled={totalPage <= 1 || page <= 1}
              title="Prev"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                }
              }}
            />
            <Button
              title="Next"
              disabled={totalPage <= 1 || page >= totalPage}
              onClick={() => {
                if (page <= totalPage) {
                  console.log('111')
                }
                setPage(page + 1)
              }}
            />
          </div>

          <div className="text-xs">
            Page {page}/{totalPage} in {rows.length} record(s)
          </div>
        </div>
        <TaskImportAction />
      </div>
    </>
  )
}
