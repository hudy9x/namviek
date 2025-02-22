import { Button, Form, messageError } from '@ui-components'
import { useState } from 'react'

const WEBHOOK_EVENTS = [
  { label: 'Create Row', value: 'grid:row:created' },
  { label: 'Update Row', value: 'grid:row:updated' },
  { label: 'Delete Row', value: 'grid:row:deleted' },
  { label: 'Update Cell', value: 'grid:cell:updated' }
]

interface CreateWebhookFormProps {
  onSubmit: (data: { url: string; secret: string; events: string[] }) => void
  onCancel: () => void
  isLoading?: boolean
}

export function CreateWebhookForm({ onSubmit, onCancel, isLoading }: CreateWebhookFormProps) {
  const [url, setUrl] = useState('')
  const [secret, setSecret] = useState('')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])

  const handleSubmit = () => {
    if (!url || selectedEvents.length === 0) {
      messageError('Please fill in webhook URL and select at least one event')
      return
    }

    onSubmit({ url, secret, events: selectedEvents })
  }

  return (
    <div className="space-y-6">
      {/* Webhook URL */}
      <div className="space-y-2">
        <Form.Input
          title="Webhook URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/webhook"
          helper="A POST request will be sent to this URL every time an event is triggered"
        />
      </div>

      {/* Signing Secret */}
      <div className="space-y-2">
        <Form.Input
          title="Signing secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          helper="A secret that will be used to sign each request. Used to verify the webhook is sent via the X-Signature header"
        />
      </div>

      {/* Events */}
      <div className="space-y-3">
        <label className="font-medium">What updates should we send?</label>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {WEBHOOK_EVENTS.map(event => (
            <div key={event.value} className="flex items-center gap-2 text-sm text-gray-500 justify-between">
              <span>{event.label}</span>
              <Form.Checkbox
                checked={selectedEvents.includes(event.value)}
                onChange={(checked) => {
                  setSelectedEvents(prev =>
                    checked
                      ? [...prev, event.value]
                      : prev.filter(e => e !== event.value)
                  )
                }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          title="Back to webhooks"
          onClick={onCancel}
        />
        <Button
          primary
          loading={isLoading}
          title="Create Webhook"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
} 
