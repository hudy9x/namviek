import { useUrl } from "@/hooks/useUrl"
import { messageWarning } from "@shared/ui"
import { useParams, useRouter } from "next/navigation"

export default function TaskTitle({ id, projectId, title }: { id: string, projectId: string, title: string }) {

  const params = useParams()
  const { replace } = useRouter()
  const { getSp } = useUrl()

  const isRandomId = id.includes('TASK-ID-RAND')

  return <div
    className="cursor-pointer"
    key={id}
    onClick={() => {
      if (isRandomId) {
        messageWarning('This task has been creating by server !')
        return
      }
      console.log('replace link with taskid')
      replace(
        `${params.orgID}/project/${projectId}?mode=${getSp(
          'mode'
        )}&taskId=${id}`
      )
    }}
  // href={`${params.orgID}/project/${task.projectId}?mode=${getSp(
  //   'mode'
  // )}&taskId=${task.id}`}
  >
    <div className="w-full">{title}</div>
  </div>
}
