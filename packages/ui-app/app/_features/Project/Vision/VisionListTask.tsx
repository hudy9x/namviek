import { useTaskStore } from '@/store/task'
import VisionTaskItem from './VisionTaskItem'
import { useVisionContext } from './context'
import ListBoxCreate from '@/components/ListBox/ListBoxCreate'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'
import { useParams } from 'next/navigation'

export default function VisionListTask() {
  const { projectId } = useParams()
  const { selected } = useVisionContext()
  const { tasks, taskLoading } = useTaskStore()
  const { taskCreateOne } = useServiceTaskAdd()
  const taskWithoutVisions = tasks.filter(t => {
    if (selected) {
      return t.visionId === selected
    }
    return !t.visionId
  })

  const onEnter = (v: string) => {
    if (!v) {
      return
    }

    taskCreateOne({
      dueDate: new Date(),
      title: v,
      taskStatusId: groupId,
      projectId
    })
  }

  return (
    <div className="space-y-2">
      {taskLoading ? <h2>Loading</h2> : null}
      {taskWithoutVisions.map((t, index) => {
        return <VisionTaskItem key={t.id} title={t.title} id={t.id} />
      })}
      <div className="bg-white rounded-md border shadow-md shadow-indigo-100">
        <ListBoxCreate placeholder="Create new task" onEnter={onEnter} />
      </div>
    </div>
  )
}
