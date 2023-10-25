import { useStatus } from '@/hooks/status'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { StatusDnDContainer } from './StatusDnDContainer'
import { AddNewBar } from '@shared/ui'

export const ProjectStatus = () => {
  const { createNewStatus } = useStatus({})

  return (
    <div className="w-full">
      <div className="border setting-container dark:border-gray-700">
        <DndProvider backend={HTML5Backend}>
          <StatusDnDContainer />
        </DndProvider>
        <AddNewBar createNewAction={createNewStatus} itemName="status" />
      </div>
    </div>
  )
}
