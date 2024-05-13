import { Task } from "@prisma/client"
import { format, formatDistanceToNowStrict } from "date-fns"



export default function MyworkTaskList({ loading, tasks }: { loading: boolean, tasks: Task[] }) {
  const total = tasks.length

  return <>
    {!loading &&
      tasks.map(task => {
        const dueDate = task.dueDate ? new Date(task.dueDate) : null
        return (
          <div className="mw-task" key={task.id}>
            <div className="">
              {/* <TaskStatus taskId={task.id} value={task.taskStatusId || ''} /> */}
              {task.title}
              <div className="text-xs text-gray-400 mt-1.5">
                {dueDate ? formatDistanceToNowStrict(dueDate, { addSuffix: true }) : null}
              </div>

              {/* <TaskPriorityCell taskId={task.id} value={task.priority} /> */}
            </div>
          </div>
        )
      })}
    {!loading && tasks.length < total && (
      <div className="mw-card-more">And {total} more</div>
    )}

    {!loading && !tasks.length && (
      <div className="task-empty text-sm bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-gray-700 shadow-sm dark:shadow-gray-900 p-3 text-gray-800 dark:text-gray-400">No task found !</div>
    )}
  </>
}
