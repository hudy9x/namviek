import { messageWarning } from "@shared/ui"
import { pushState } from "packages/ui-app/libs/pushState"

export default function TaskTitle({ id, projectId, title }: { id: string, projectId: string, title: string }) {

  const isRandomId = id.includes('TASK-ID-RAND')

  return <div
    className="cursor-pointer"
    key={id}
    onClick={() => {
      if (isRandomId) {
        messageWarning('This task has been creating by server !')
        return
      }
      pushState('taskId', id)
    }}
  >
    <div className="w-full active:text-gray-500">{title}</div>
  </div>
}
