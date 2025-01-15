import { useState } from "react"
import { useChecklistStore } from "./store"
import { taskChecklistSv } from "@/services/task.checklist"
import { messageSuccess } from "@shared/ui"

export default function ChecklistInput({ id, value, taskId }: {
  id: string,
  taskId: string,
  value: string
}) {
  const [title, setTitle] = useState(value)
  const { updateChecklist } = useChecklistStore()

  const onUpdate = (id: string, title: string) => {
    if (!title) return

    updateChecklist(taskId, { title, id })
    taskChecklistSv.update({
      title,
      id
    }).then(res => {
      console.log(res)
      messageSuccess('Change title  ok !')
    })
  }

  return <input className="checklist-input" readOnly={true} value={title}
    onChange={ev => setTitle(ev.target.value)}
    onKeyPress={(ev) => {
      // ev.stopPropagation()
      const target = ev.target as HTMLInputElement

      if (ev.key === 'Enter') {
        ev.preventDefault()
        onUpdate(id, target.value)
        target.blur()
        return
      }

    }} />
}
