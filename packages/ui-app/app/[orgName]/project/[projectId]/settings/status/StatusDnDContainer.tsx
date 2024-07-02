import { useProjectStatusStore } from '../../../../../../store/status'
import StatusItemDnD from './StatusItemDnD'
import { StatusItem } from './StatusItem'

export const StatusDnDContainer = () => {
  const { statuses } = useProjectStatusStore()

  return (
    <>
      {statuses.length ? (
        <div className="divide-y border-b dark:border-gray-700 dark:divide-gray-800">
          {statuses.map((status, index) => (
            <StatusItemDnD status={status} index={index} key={status.id}>
              <StatusItem status={status} />
            </StatusItemDnD>
          ))}
        </div>
      ) : null}
    </>
  )
}
