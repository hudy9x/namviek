import { useMemberStore } from '@/store/member'
import { useProjectPointStore } from '@/store/point'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { StatusType } from '@prisma/client'
import { copyToClipboard } from '@shared/libs'
import { DatePicker, messageSuccess } from '@shared/ui'
import { format } from 'date-fns'
import { useRef, Fragment, useState } from 'react'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'

export default function PromptTaskEvaluation() {
  const divRef = useRef<HTMLDivElement>(null)
  const { tasks } = useTaskStore()
  const { points } = useProjectPointStore()

  const onCopy = () => {
    if (!divRef.current) return

    const textHtml = divRef.current.innerHTML || ''
    copyToClipboard(textHtml.replace(/<br>/gm, '\n'))
    messageSuccess('Copied to clipboard !')
  }

  return (
    <div className="whitespace-pre-line">
      <div
        className="absolute top-2 right-2 border rounded-md p-2 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        onClick={onCopy}>
        <HiOutlineSquare2Stack className="w-5 h-5" />
      </div>
      <div ref={divRef}>
        Act as a software project manager <br />
        Based on start date and end date of following tasklist <br />
        So please help me to calculate the point for each task
        <br />
        {!points.length ? (
          <>
            The point is calculated by substracting the end date to the start
            date
            <br />
            Ex:
            <br />
            start date: 11/22/2023 <br />
            end date: 11/23/2023
            <br />
            then the point is 11/23/2023 - 11/22/2023 = 1 point
            <br />
          </>
        ) : (
          <>
            Here is the list of points that pre-configured
            <br />
            {points.map(p => p.point).join(',')}
            <br />
            The lowest point corresponds to the lowest complexity and vice versa
            <br />
          </>
        )}
        Here is the task list
        <br />
        ```csv
        <br />
        No, title, Start date, End date
        <br />
        {tasks.map((task, taskIndex) => {
          const { title, plannedStartDate, plannedDueDate } = task

          const startDate = plannedStartDate
            ? format(new Date(plannedStartDate), 'dd/MM/yyyy')
            : 'NG'
          const endDate = plannedDueDate
            ? format(new Date(plannedDueDate), 'dd/MM/yyyy')
            : 'NG'

          return (
            <Fragment key={task.id}>
              {[taskIndex + 1, title, startDate, endDate].join(',')}
              <br />
            </Fragment>
          )
        })}
        ``` <br />
        <br />
        The output should be an csv format as follow and nothing else. Ex:
        <br />
        ```csv
        <br />
        NO,TITLE,POINT
        <br />
        1,cong viec 2, 1 <br />
        2,cong viec 3, 2 <br />
        3,cong viec 5, 5 <br />
        ```
      </div>
    </div>
  )
}
