'use client'

import VisionCreate from './VisionCreate'
import { useVisionContext } from './context'
import ListBox from '@/components/ListBox'
import AbsoluteLoading from '@/components/AbsoluateLoading'
import VisionItem from './VisionItem'

import VisionListHeader from './VisionListHeader'

import { HiOutlineInbox } from 'react-icons/hi2'

export default function VisionList() {
  const { visions, loading, selected, visionProgress, taskDone, taskTotal } =
    useVisionContext()

  const convertToProgress = (done: number, total: number) => {
    if (!done || !total) return 0
    const progress = parseFloat(((done / total) * 100).toFixed(1))
    return progress
  }

  const completeRate = convertToProgress(taskDone, taskTotal)

  return (
    <div className="p-3 w-[350px] shrink-0">
      <ListBox className="">
        <ListBox.Body>
          <VisionListHeader
            total={visions.length}
            done={taskDone}
            inprogress={taskTotal - taskDone}
            rate={completeRate}
          />
          <div
            className="divide-y dark:divide-gray-700 custom-scrollbar relative overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: `calc(100vh - 300px)` }}>
            <AbsoluteLoading enabled={loading} />
            {!visions.length ? (
              <div className="py-4 flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <HiOutlineInbox className="inline-block w-6 h-6" />
                  <h2>No vision found !</h2>
                </div>
              </div>
            ) : null}
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
          </div>
          <VisionCreate />
        </ListBox.Body>
      </ListBox>
    </div>
  )
}
