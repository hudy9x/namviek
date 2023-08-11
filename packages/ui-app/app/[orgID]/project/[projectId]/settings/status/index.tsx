import { KeyboardEvent, useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { StatusDnDContainer } from './StatusDnDContainer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useStatus } from 'packages/ui-app/app/_hook/status'

export const ProjectStatus = () => {
  const inputAddRef = useRef<HTMLInputElement>(null)
  const { createNewStatus } = useStatus({})

  const onPressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    createNewStatus(e, inputAddRef)
  }

  return (
    <div className="w-full">
      <div className="setting-container border">
        <DndProvider backend={HTML5Backend}>
          <StatusDnDContainer />
        </DndProvider>
        <div className="relative flex items-center bg-gray-50 rounded-b-lg">
          <AiOutlinePlus className="absolute top-3.5 left-4 text-gray-500" />
          <input
            ref={inputAddRef}
            className="bg-transparent w-full pl-12 text-gray-500 text-sm pr-8 py-3 outline-none"
            placeholder="Hit `Enter` to add a new status"
            onKeyDown={onPressEnter}
          />
        </div>
      </div>
    </div>
  )
}
