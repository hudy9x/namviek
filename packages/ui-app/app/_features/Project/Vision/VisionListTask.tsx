import { useTaskStore } from '@/store/task'
import VisionTaskItem from './VisionTaskItem'

export default function VisionListTask() {
  const { tasks, taskLoading } = useTaskStore()
  const taskWithoutVisions = tasks.filter(t => !t.visionId)
  return (
    <div className="space-y-2">
      {taskLoading ? <h2>Loading</h2> : null}
      {taskWithoutVisions.map((t, index) => {
        return <VisionTaskItem key={t.id} title={t.title} id={t.id} />
      })}
    </div>
  )
}
