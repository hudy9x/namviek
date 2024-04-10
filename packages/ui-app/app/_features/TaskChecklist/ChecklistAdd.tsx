import { taskChecklistSv } from "@/services/task.checklist";
import { HiOutlinePlus } from "react-icons/hi2";
import { useChecklistStore } from "./store";

export default function ChecklistAdd({ taskId }: { taskId: string }) {
  const { addOneChecklist } = useChecklistStore()
  const onEnter = (value: string) => {

    addOneChecklist({
      id: 'soijoi',
      title: value,
      taskId,
      order: 1,
      done: false,
      doneAt: null
    })


    // taskChecklistSv.create({
    //   taskId,
    //   title: value
    // }).then(res => {
    //   console.log(res)
    // })
  }
  return <div className="checklist-item">
    <HiOutlinePlus />
    <input onKeyPress={(ev) => {
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
