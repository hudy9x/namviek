import { useUrl } from "@/hooks/useUrl"
import { useTaskViewStore } from "@/store/taskView"
import { messageWarning } from "@shared/ui"
import { useParams, useRouter } from "next/navigation"

export default function TaskTitle({ id, projectId, title }: { id: string, projectId: string, title: string }) {

  // const params = useParams()
  // const { replace, push } = useRouter()
  // const { getSp } = useUrl()
  const { openTaskDetail } = useTaskViewStore()

  const isRandomId = id.includes('TASK-ID-RAND')

  return <div
    className="cursor-pointer"
    key={id}
    onClick={() => {
      if (isRandomId) {
        messageWarning('This task has been creating by server !')
        return
      }
      openTaskDetail(id)
      // replace(
      //   `${params.orgID}/project/${projectId}?mode=${getSp(
      //     'mode'
      //   )}&taskId=${id}`
      // )
    }}
  // href={`${params.orgID}/project/${task.projectId}?mode=${getSp(
  //   'mode'
  // )}&taskId=${task.id}`}
  >
    <div className="w-full active:text-gray-500">{title}</div>
  </div>
}
