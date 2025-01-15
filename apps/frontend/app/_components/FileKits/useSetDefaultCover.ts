import { useUrl } from "@/hooks/useUrl"
import { taskMakeCover } from "@/services/task"
import { useTaskStore } from "@/store/task"
import { messageSuccess } from "@shared/ui"
import { useSearchParams } from "next/navigation"
import { useFileKitContext } from "./context"

export const useSetDefaultCover = () => {
  const { projectId } = useUrl()
  const { taskId } = useFileKitContext()

  const { tasks, updateTask } = useTaskStore()
  const currentTask = tasks.find(t => t.id === taskId)


  const setDefaultCover = (url: string) => {
    if (!currentTask) return

    const { id, cover } = currentTask

    // only set default cover image if it's empty
    if (cover) {
      return
    }

    updateTask({
      id,
      cover: url
    })

    taskMakeCover({
      taskId: id,
      url,
      projectId
    }).then(res => {
      messageSuccess('updated cover')
    })
  }

  return { setDefaultCover }
}
