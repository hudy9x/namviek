import { useProjectStatusStore } from 'packages/ui-app/store/status'
import { BoardHeaderContent } from './BoardHeaderContent'
import { BoardBodyContent } from './BoardBodyContent'

export const BoardContent = () => {
  const { statuses } = useProjectStatusStore()
  return (
    <div className="flex">
      {statuses.map(status => (
        <div key={status.id} className="mr-2">
          <BoardHeaderContent status={status} />
          <BoardBodyContent statusId={status.id} />
        </div>
      ))}
    </div>
  )
}
