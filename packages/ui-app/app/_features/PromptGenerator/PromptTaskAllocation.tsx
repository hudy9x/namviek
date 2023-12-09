import { useMemberStore } from '@/store/member'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { StatusType } from '@prisma/client'
import { copyToClipboard } from '@shared/libs'
import { DatePicker, messageSuccess } from '@shared/ui'
import { format } from 'date-fns'
import { useRef, Fragment, useState } from 'react'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'

export default function PromptTaskAllocation() {
  const divRef = useRef<HTMLDivElement>(null)
  const { tasks } = useTaskStore()
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()
  const [deadline, setDeadline] = useState(new Date())

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
      <DatePicker
        value={deadline}
        onChange={val => setDeadline(val)}
        placeholder="Set an expected deadline"
        className="w-[300px] mb-3"
      />
      <div ref={divRef}>
        Act as a software project manager <br />
        Based on the following tasklist and members <br />
        And the deadline for all of task are before or in{' '}
        {format(deadline, 'dd/MM/yyyy')} <br />
        So please help me to allocate the following task to every single members
        <br />
        Make sure that every members should be assigned to appropriate workloads
        <br />
        Here is the task list
        <br />
        ```csv
        <br />
        No,Title,Assignee,Priority
        <br />
        {tasks.map((task, taskIndex) => {
          const { id, title, taskStatusId, priority, assigneeIds } = task
          const stt = statuses.find(s => s.id === taskStatusId)
          if (!stt || stt.type === StatusType.DONE) {
            return null
          }
          const assigneeId = assigneeIds[0]
          const member = members.find(m => m.id === assigneeId)

          return (
            <Fragment key={task.id}>
              {[taskIndex + 1, title, member?.name || 'NG', priority].join(',')}
              <br />
            </Fragment>
          )
        })}
        ``` <br />
        And here is the member list
        <br />
        ```csv
        <br />
        No,Name
        <br />
        {members.map((mem, memIndex) => {
          const { name } = mem
          return (
            <Fragment key={mem.id}>
              {[memIndex + 1, name].join(',')}
              <br />
            </Fragment>
          )
        })}
        ```
        <br />
        The output should be an csv format as follow and nothing else. Ex:
        <br />
        ```csv
        <br />
        NO,TITLE,ASSIGNEE,START_DATE,END_DATE,PRIORITY <br />
        1,cong viec 2, Huudai,11/23/2023, 11/24/2023, LOW <br />
        2,cong viec 3, huy,11/23/2023, 11/25/2023,LOW <br />
        3,cong viec 5, Huudai,11/25/2023, 11/27/2023,LOW <br />
        ```
      </div>
    </div>
  )
}
