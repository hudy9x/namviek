import { useChecklistStore } from "./store";
import { taskChecklistSv } from "@/services/task.checklist";
import { useDebounce } from "@/hooks/useDebounce";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TaskChecklist } from "@prisma/client";

export default function useGetTaskChecklist(taskId: string, parentTaskId?: string | null, setListSubTaskCheckList?: Dispatch<SetStateAction<TaskChecklist[]>>) {

  const { addTaskChecklist, setCheclistLoading } = useChecklistStore()

  useEffect(() => {
    setCheclistLoading(true)
  }, [])

  useDebounce(() => {
    taskId && taskChecklistSv.getByTaskId(taskId).then(res => {
      const { data } = res.data
      if (parentTaskId) {
        setListSubTaskCheckList && setListSubTaskCheckList(data)
        return
      }

      if (!data) {
        setCheclistLoading(false)
        return
      }

      addTaskChecklist(taskId, data)
      setCheclistLoading(false)

    }).catch(err => {
      console.log(err)
      setCheclistLoading(false)
    })
  }, [taskId])
}
