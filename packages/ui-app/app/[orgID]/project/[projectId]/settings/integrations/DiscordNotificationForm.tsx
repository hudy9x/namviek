import { DiscordNotification } from '@prisma/client'
import { Button, Form, messageWarning } from '@shared/ui'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { validateDiscordNotification } from '@shared/validation'

export interface IDiscordNotificationDefaultValues {
  discordWebhookUrl: string
  discordWebhookName: string
  discordWebhookIcon: string
  enabled: boolean
}

export const defaultFormikValues: IDiscordNotificationDefaultValues = {
  discordWebhookUrl: '',
  discordWebhookName: '',
  discordWebhookIcon: '',
  enabled: true
}

export default function DiscordNotificationForm({
  defaultValue = defaultFormikValues
}) {
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const refDefaultValue =
    useRef<IDiscordNotificationDefaultValues>(defaultValue)

  const formik = useFormik({
    initialValues: refDefaultValue.current,
    onSubmit: values => {
      if (loading) {
        messageWarning('Server is processing')
        return
      }

      setLoading(true)
      const mergedValues = { ...values, projectId: params.projectId }

      const { error, errorArr } = validateDiscordNotification(mergedValues)

      if (error) {
        setLoading(false)
        console.error(errorArr)
        return
      }

      // onsubmit(mergedValues)
    }
  })

  return (
    <div className="setting-container">
      <div className="rounded-lg border dark:border-gray-700">
        <form className=" p-6 space-y-3 gap-6 relative">
          <div className="flex items-start gap-3">
            <div className="space-y-3 w-full">
              <p>Enter your discord web hook</p>
              <Form.Input
                title="Discord webhook url"
                name="discordWebhookUrl"
                value={formik.values.discordWebhookUrl}
                onChange={formik.handleChange}
                placeholder="Enter your discord webhook url !"
              />

              <Form.Input
                title="Bot's name"
                name="discordWebhookName"
                value={formik.values.discordWebhookName}
                onChange={formik.handleChange}
                placeholder="Enter your bot's name !"
              />
              <Form.Input
                title="Bot's icon"
                name="title"
                value={formik.values.discordWebhookIcon}
                onChange={formik.handleChange}
                placeholder="Enter your bot's icon !"
              />
              <div className="text-right">
                <Button loading={loading} title="Test" primary />
                <Button
                  type="submit"
                  loading={loading}
                  title="Submit"
                  primary
                  className='ml-5'
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
