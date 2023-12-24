import { useTaskStore } from "@/store/task"
import { useMemo } from "react"
import { BoardTaskItem } from "./BoardTaskItem"

export default function BoardCard({ index, id }: { index: number, id: string }) {
  const { tasks } = useTaskStore()
  const task = useMemo(() => {
    return tasks.find(t => t.id === id)
  }, [id, JSON.stringify(tasks)])

  if (!task) return null

  // return <div className="board-task-item">
  //   {task.title}
  // </div>

  return <BoardTaskItem index={index} data={task} />
}
