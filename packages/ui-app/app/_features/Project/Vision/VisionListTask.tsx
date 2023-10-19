import { useTaskStore } from '@/store/task'

export default function VisionListTask() {
  const { tasks } = useTaskStore()
  const taskWithoutVisions = tasks.filter(t => !t.visionId)
  return (
    <div className="bg-white border shadow-lg shadow-indigo-100 rounded-md">
      {taskWithoutVisions.map(t => {
        return (
          <div key={t.id} className="px-3 py-2 border-b text-sm">
            {t.title}
          </div>
        )
      })}
    </div>
  )
}
