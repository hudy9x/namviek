import { HiOutlinePlus } from 'react-icons/hi2'
import { useChecklistStore } from './store'
import { Dispatch, SetStateAction, useRef } from 'react'
import { randomId } from '@shared/ui'
import { taskChecklistSv } from '@/services/task.checklist'
import { TaskChecklist } from '@prisma/client'

export default function ChecklistAdd({
  taskId,
  parentTaskId,
  setListSubTaskCheckList
}: {
  taskId: string
  parentTaskId?: string | null
  setListSubTaskCheckList: Dispatch<SetStateAction<TaskChecklist[]>>
}) {
  const { addOneChecklist, checklists, updateChecklistId } = useChecklistStore()
  const taskChecklist = checklists[taskId] || []
  const inpRef = useRef<HTMLInputElement>(null)
  const onEnter = (value: string) => {
    inpRef.current && (inpRef.current.value = '')

    const randCheckListId = 'RAND-' + randomId()
    const newData = {
      id: randCheckListId,
      title: value,
      taskId,
      order: taskChecklist.length + 1,
      done: false,
      doneAt: null
    }

    if (!parentTaskId) {
      addOneChecklist(newData)
    } else {
      setListSubTaskCheckList(prev => [...prev, newData]);
    }

    taskChecklistSv
      .create({
        taskId,
        title: value
      })
      .then(res => {
        console.log(res)
        const { data } = res.data
        const taskChecklist = data as TaskChecklist

        if (!taskChecklist || !taskChecklist.id || parentTaskId) return

        updateChecklistId(taskId, randCheckListId, taskChecklist.id)
      })
  }
  return (
    <div className="checklist-item">
      <HiOutlinePlus />
      <input
        className="checklist-input"
        ref={inpRef}
        onKeyPress={ev => {
          ev.stopPropagation()

          const target = ev.target as HTMLInputElement

          if (ev.key === 'Enter') {
            console.log(target.value)
            onEnter(target.value)
            ev.preventDefault()
          }
        }}
        placeholder="Create new checklist"
      />
    </div>
  )
}
