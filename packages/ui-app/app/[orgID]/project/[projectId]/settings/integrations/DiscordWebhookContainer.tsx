import {
  discordWebhookAdd,
  discordWebhookGetMany
} from '@/services/discordWebhook'
import { useParams } from 'next/navigation'
import { LoadingSpinner } from 'packages/shared-ui/src/components/Loading'
import { useEffect, useState } from 'react'
import DiscordWebhookForm from './DiscordWebhookForm'

export interface IDiscordWebhookDefaultValues {
  projectId?: string
  url: string
  botName: string
  botIcon: string
  enabled: boolean
}

export const defaultFormikValues: IDiscordWebhookDefaultValues = {
  url: '',
  botName: '',
  botIcon: '',
  enabled: true
}

export default function DiscordWebhookContainer() {
  const { projectId } = useParams()
  const [loading, setLoading] = useState(true)
  const [discordWebhooks, setDiscordWebhooks] = useState<
    IDiscordWebhookDefaultValues[]
  >([])

  useEffect(() => {
    const controller = new AbortController()

    discordWebhookGetMany({ projectId: projectId }, controller.signal)
      .then(res => {
        const { data } = res.data
        console.log('data:', data)
        setDiscordWebhooks(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

    return () => {
      controller.abort()
      setLoading(false)
    }
  }, [])

  const onSubmit = (v: IDiscordWebhookDefaultValues) => {
    discordWebhookAdd(v)
  }

  return loading ? (
    <div className="w-4 h-4">
      <LoadingSpinner />
    </div>
  ) : (
    <DiscordWebhookForm
      defaultValue={
        discordWebhooks.length ? discordWebhooks[0] : defaultFormikValues
      }
      onSubmit={onSubmit}
    />
  )
}
