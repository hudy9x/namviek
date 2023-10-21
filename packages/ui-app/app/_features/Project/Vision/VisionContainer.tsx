import { HiOutlineViewBoards, HiOutlineViewList } from 'react-icons/hi'
import ProjectVisionList from './VisionList'
import { HiOutlineBars3, HiOutlineViewColumns } from 'react-icons/hi2'
import { Button, FormGroup } from '@shared/ui'
import { useState } from 'react'
import ListPreset from '@/components/ListPreset'
import VisionListTask from './VisionListTask'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'

export default function ProjectVisionContainer() {
  const [view, setView] = useState('list')
  const { updateTaskData } = useServiceTaskUpdate()
  const onDragEnd = (ev: DragEndEvent) => {
    const { active, over } = ev
    if (!active.id || !over?.id) {
      return
    }

    const taskId = active.id as string
    const visionId = over.id as string

    updateTaskData({
      id: taskId,
      visionId
    })

    console.log(active, over)
  }
  return (
    <div className="vision relative">
      <DndContext onDragEnd={onDragEnd}>
        <div
          className="flex px-1 divide-x"
          style={{ height: `calc(100vh - 83px)` }}>
          <div className="p-3 w-[300px] shrink-0">
            <VisionListTask />
          </div>
          <div className="p-3 w-[300px] shrink-0">
            <ProjectVisionList />
          </div>
        </div>
      </DndContext>
    </div>
  )
}
