'use client'

import VisionCreate from './VisionCreate'
import { useVisionContext } from './context'
import ListBox from '@/components/ListBox'
import AbsoluteLoading from '@/components/AbsoluateLoading'
import VisionItem from './VisionItem'
import { useTaskStore } from '@/store/task'
import { Task } from '@prisma/client'

export default function ProjectVisionList() {
  const { visions, loading } = useVisionContext()
  const { tasks } = useTaskStore()

  const visionByIds: { [key: string]: Task[] } = {}

  visions.forEach(v => {
    visionByIds[v.id] = []
  })

  tasks.forEach(task => {
    const { visionId } = task
    if (!visionId || !visionByIds[visionId]) return

    visionByIds[visionId].push(task)
  })

  console.log(visionByIds)

  return (
    <ListBox className="w-[300px]">
      <AbsoluteLoading enabled={loading} />

      <ListBox.Body>
        {visions.map(vision => {
          const taskData = visionByIds[vision.id]
          return <VisionItem data={vision} key={vision.id} tasks={taskData} />
        })}
        <VisionCreate />
      </ListBox.Body>
    </ListBox>
  )
}
