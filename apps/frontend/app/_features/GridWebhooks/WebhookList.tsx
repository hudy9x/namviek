import { Button, confirmAlert, Loading } from '@ui-components'
import { GridWebhook } from '@prisma/client'
import { HiOutlineTrash, HiPlus } from 'react-icons/hi2'

interface WebhookListProps {
  webhooks: GridWebhook[]
  onDelete: (id: string) => void
  onAdd: () => void
  isHidden: boolean
  isLoading?: boolean
}

export function WebhookList({
  webhooks,
  onDelete,
  onAdd,
  isHidden = false,
  isLoading = false
}: WebhookListProps) {
  const EventsList = ({ events }: { events: string[] }) => {
    return (
      <div className="flex flex-wrap gap-1">
        {events.map(ev => {
          return (
            <span key={ev} className="px-1 py-0.5 rounded-sm text-xs bg-gray-100">
              {ev}
            </span>
          )
        })}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loading />
      </div>
    )
  }

  return (
    <div className={`${isHidden ? 'hidden' : ''} space-y-3`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Webhooks</h2>
      </div>

      <div className="space-y-3">
        {webhooks.map(webhook => (
          <div
            key={webhook.id}
            className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="space-y-3">
                <div className="text-gray-600 flex items-center justify-between gap-2">
                  <span>{webhook.url}</span>
                  <Button
                    size="sm"
                    leadingIcon={<HiOutlineTrash />}
                    onClick={() => {
                      confirmAlert({
                        title: 'Delete Webhook',
                        message: 'Are you sure you want to delete this webhook?',
                        yes: () => {
                          onDelete(webhook.id)
                        }
                      })
                    }}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <EventsList events={webhook.events} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={onAdd} leadingIcon={<HiPlus />} title="Add Webhook" />
    </div>
  )
}
