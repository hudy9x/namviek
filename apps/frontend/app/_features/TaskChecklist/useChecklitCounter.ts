import { useEffect } from "react";
import { useChecklistStore } from "./store";
import { useTaskStore } from "@/store/task";

export default function useChecklistCounter(taskId: string) {
  const { checklists } = useChecklistStore()
  const { updateChecklistCounter } = useTaskStore()

  useEffect(() => {
    if (!taskId) {
      return
    }

    const taskChecklist = checklists[taskId]
    if (!taskChecklist) return

    const [todo, done] = taskChecklist.reduce((counter, checklist) => {
      if (checklist.done) {
        counter[1] += 1
      } else {
        counter[0] += 1
      }

      return counter
    }, [0, 0])

    updateChecklistCounter(taskId, done, todo)

  }, [taskId, JSON.stringify(checklists)])
}
