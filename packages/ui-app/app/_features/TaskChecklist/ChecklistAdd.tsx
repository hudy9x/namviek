import { HiOutlinePlus } from "react-icons/hi2";
import { useChecklistStore } from "./store";
import { useRef } from "react";
import { randomId } from "@shared/ui";
import { taskChecklistSv } from "@/services/task.checklist";
import { TaskChecklist } from "@prisma/client";

export default function ChecklistAdd({ taskId }: { taskId: string }) {
  const { addOneChecklist, checklists, updateChecklistId } = useChecklistStore()
  const taskChecklist = checklists[taskId] || []
  const inpRef = useRef<HTMLInputElement>(null)
  const onEnter = (value: string) => {

    inpRef.current && (inpRef.current.value = '')

    const randCheckListId = 'RAND-' + randomId()

    addOneChecklist({
      id: randCheckListId,
      title: value,
      taskId,
      order: taskChecklist.length + 1,
      done: false,
      doneAt: null
    })

    taskChecklistSv.create({
      taskId,
      title: value
    }).then(res => {
      console.log(res)
      const { data } = res.data
      const taskChecklist = data as TaskChecklist

      if (!taskChecklist || !taskChecklist.id) return

      updateChecklistId(taskId, randCheckListId, taskChecklist.id)


    })
  }
  return <div className="checklist-item">
    <HiOutlinePlus />
    <input className="checklist-input" ref={inpRef} onKeyPress={(ev) => {
      ev.stopPropagation()

      const target = ev.target as HTMLInputElement

      if (ev.key === 'Enter') {
        console.log(target.value)
        onEnter(target.value)
        ev.preventDefault()
      }

    }} placeholder="Create new checklist" />
  </div>
}
