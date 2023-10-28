import {
  discordWebhookAdd,
  discordWebhookGetMany,
  discordWebhookUpdate
} from '@/services/discordWebhook'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { LoadingSpinner } from 'packages/shared-ui/src/components/Loading'
import { useEffect, useState } from 'react'
import DiscordWebhookForm from './DiscordWebhookForm'

export interface IDiscordWebhookDefaultValues {
  id?: string
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
  const [loadingForm, setLoadingForm] = useState(false)

  const [discordWebhooks, setDiscordWebhooks] = useState<
    IDiscordWebhookDefaultValues[]
  >([])

  useEffect(() => {
    const controller = new AbortController()

    discordWebhookGetMany({ projectId: projectId }, controller.signal)
      .then(res => {
        const { data } = res.data
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
    discordWebhooks.length
      ? discordWebhookUpdate(v)
          .then(res => {
            const { status } = res
            setLoadingForm(false)
            if (status !== 200) return
            messageSuccess('Update success')
          })
          .catch(err => {
            setLoadingForm(false)
            messageError('Update webhook error')
          })
      : discordWebhookAdd(v)
          .then(res => {
            const { status } = res
            setLoadingForm(false)
            if (status !== 200) return
            messageSuccess('Save success')
          })
          .catch(err => {
            setLoadingForm(false)
            messageError('Save webhook error')
          })
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
      loadingForm={loadingForm}
      setLoadingForm={setLoadingForm}
    />
  )
}
