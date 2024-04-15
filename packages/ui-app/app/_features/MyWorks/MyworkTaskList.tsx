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
      <div className="task-empty text-sm bg-red-200 dark:bg-red-300 rounded-md border border-red-200 dark:border-red-400 shadow-sm shadow-red-300 dark:shadow-red-700 p-3 text-red-800">
        {`🎃😎🥶 No tasks found! You're so lucky buddy !!`}
      </div>
    )}
  </>
}
