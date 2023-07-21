import { useTaskStore } from 'packages/ui-app/store/task'
import { BoardBodyTitle } from './BoardBodyTitle'
import { BoardActionAssignee } from './BoardBodyAction/BoardActionAssignee'

export const BoardBodyContent = ({ statusId }: { statusId: string }) => {
  const { tasks } = useTaskStore()

  return (
    <>
      {tasks.map((task, index) => {
        if (task.taskStatusId !== statusId) return null
        return (
          <div
            key={index}
            className="bg-white mt-2 p-3 rounded-md shadow-sm h-24">
            <BoardBodyTitle title={task.title || ''} />
            <BoardActionAssignee taskId={task.id} uids={task.assigneeIds} />
          </div>
        )
      })}
    </>
  )
}
