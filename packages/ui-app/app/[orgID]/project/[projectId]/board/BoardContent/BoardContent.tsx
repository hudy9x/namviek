import { TaskStatus } from '@prisma/client'
import { useProjectStatusStore } from 'packages/ui-app/store/status'
import { ReactNode } from 'react'
import { BoardHeaderContent } from './BoardHeaderContent'
import { BoardBodyContent } from './BoardBodyContent'

export const BoardContent = () => {
  const { statuses } = useProjectStatusStore()
  return (
    <div className="flex">
      {statuses.map(status => (
        <div className="mr-2">
          <BoardHeaderContent status={status} />
          <BoardBodyContent statusId={status.id} />
        </div>
      ))}
    </div>
  )
}
