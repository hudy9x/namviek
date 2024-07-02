import { StatusDnDContainer } from './StatusDnDContainer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import StatusCreate from './StatusCreate'

export const ProjectStatus = () => {
  return (
    <div className="w-full">
      <div className="setting-container border dark:border-gray-700">
        <DndProvider backend={HTML5Backend}>
          <StatusDnDContainer />
        </DndProvider>
        <StatusCreate />
      </div>
    </div>
  )
}
