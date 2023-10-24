'use client'

import VisionCreate from './VisionCreate'
import { useVisionContext } from './context'
import ListBox from '@/components/ListBox'
import AbsoluteLoading from '@/components/AbsoluateLoading'
import VisionItem from './VisionItem'
import Badge from '@/components/Badge'

export default function VisionList() {
  const { visions, loading, selected, visionProgress, taskDone, taskTotal } =
    useVisionContext()

  const convertToProgress = (done: number, total: number) => {
    const progress = parseFloat(((done / total) * 100).toFixed(1))
    return progress
  }

  const completeRate = convertToProgress(taskDone, taskTotal)
  const badgeColor =
    completeRate === 100 ? 'green' : completeRate === 0 ? 'red' : 'yellow'

  return (
    <div className="p-3 w-[350px] shrink-0">
      <ListBox className="">
        <AbsoluteLoading enabled={loading} />

        <ListBox.Body>
          <div className="flex rounded-t-md bg-gray-50 dark:bg-gray-800 items-center justify-between px-3 py-2 text-xs">
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
    </div>
  )
}
