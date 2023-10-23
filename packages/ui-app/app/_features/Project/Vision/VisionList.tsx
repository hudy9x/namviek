'use client'

import VisionCreate from './VisionCreate'
import { useVisionContext } from './context'
import ListBox from '@/components/ListBox'
import AbsoluteLoading from '@/components/AbsoluateLoading'
import VisionItem from './VisionItem'
import { useTaskStore } from '@/store/task'
import { Task } from '@prisma/client'
import { useProjectStatusStore } from '@/store/status'
import Badge from '@/components/Badge'

export default function ProjectVisionList() {
  const { visions, loading, selected } = useVisionContext()
  const { statusDoneId } = useProjectStatusStore()
  const { tasks } = useTaskStore()

  const visionByIds: { [key: string]: Task[] } = {}
  const visionProgress: { [key: string]: { total: number; done: number } } = {}

  let taskTotal = 0
  let taskDone = 0

  visions.forEach(v => {
    visionByIds[v.id] = []
    visionProgress[v.id] = { total: 0, done: 0 }
  })

  tasks.forEach(task => {
    const { visionId, done, taskStatusId } = task
    if (!visionId || !visionByIds[visionId]) return

    taskTotal += 1
    visionProgress[visionId].total += 1

    if (done || taskStatusId === statusDoneId) {
      visionProgress[visionId].done += 1
      taskDone += 1
    }

    visionByIds[visionId].push(task)
  })

  const convertToProgress = (done: number, total: number) => {
    const progress = parseFloat(((done / total) * 100).toFixed(1))
    return progress
  }

  const completeRate = convertToProgress(taskDone, taskTotal)
  const badgeColor =
    completeRate === 100 ? 'green' : completeRate === 0 ? 'gray' : 'yellow'

  return (
    <ListBox className="w-[300px]">
      <AbsoluteLoading enabled={loading} />

      <ListBox.Body>
        <div className="flex items-center justify-between px-3 py-2 text-xs">
          <div className="">
            <span className="uppercase text-[11px] font-bold text-gray-600">
              All visions: {visions.length}
            </span>
            <div className="text-[11px] space-x-2 text-gray-400">
              <span className="capitalize">Done: {taskDone}</span>
              <span className="capitalize">
                In progress: {taskTotal - taskDone}
              </span>
            </div>
          </div>
          <Badge title={`${completeRate} %`} color={badgeColor} />
        </div>
        {visions.map(vision => {
          const progressData = visionProgress[vision.id]
          const active = selected === vision.id

          const progress = convertToProgress(
            progressData.done,
            progressData.total
          )

          return (
            <VisionItem
              key={vision.id}
              name={vision.name}
              id={vision.id}
              inprogress={progressData.total - progressData.done}
              progress={progress || 0}
              active={active}
            />
          )
        })}
        <VisionCreate />
      </ListBox.Body>
    </ListBox>
  )
}
