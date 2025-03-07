import TimerButton from "@/features/TimeTracker/TimerButton"
import { messageWarning } from "@ui-components"
import { pushState } from "apps/frontend/libs/pushState"

export default function TaskTitle({ id, projectId, title }: { id: string, projectId: string, title: string }) {

  const isRandomId = id.includes('TASK-ID-RAND')

  return <div
    className="cursor-pointer flex items-center gap-2"
    key={id}
    onClick={() => {
      if (isRandomId) {
        messageWarning('This task has been creating by server !')
        return
      }
      pushState('taskId', id)
    }}
  >
    <TimerButton taskId={id} />
    <div className="w-full active:text-gray-500">{title}</div>
  </div>
}
