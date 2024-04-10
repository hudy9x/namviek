import { useChecklistStore } from "./store";
import { taskChecklistSv } from "@/services/task.checklist";
import { useDebounce } from "@/hooks/useDebounce";

export default function useGetTaskChecklist(taskId: string) {

  const { addTaskChecklist } = useChecklistStore()

  useDebounce(() => {
    taskChecklistSv.getByTaskId(taskId).then(res => {
      const { data } = res.data
      if (!data) return

      console.log('task checklist return ', data)
      addTaskChecklist(taskId, data)

    })
  }, [taskId])
}
