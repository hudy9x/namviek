import EmojiInput from '@/components/EmojiInput'
import {
  Button,
  Form,
  FormGroup,
  messageError,
  messageSuccess,
  messageWarning
} from '@shared/ui'
import { validateDiscordNotification } from '@shared/validation'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'

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
      console.log('values:', values)
      if (loading) {
        messageWarning('Server is processing')
        return
      }

      setLoading(true)
      const mergedValues = { ...values, projectId: params.projectId }

      const { error, errorArr } = validateDiscordNotification(mergedValues)

      if (error) {
        setLoading(false)
        //This form only require one field: `discordWebhookUrl`
        messageError(errorArr['discordWebhookUrl'])
        console.error(errorArr)
        return
      }
      console.log(values)

      messageSuccess(values.discordWebhookUrl)
      // onsubmit(mergedValues)
      setLoading(false)
    }
  })

  return (
    <div className="setting-container">
      <div className="rounded-lg border dark:border-gray-700">
        <form
          onSubmit={formik.handleSubmit}
          className=" p-6 space-y-3 gap-6 relative">
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
              <FormGroup title="Bot's name">
                <EmojiInput
                  value={formik.values.discordWebhookIcon}
                  onChange={val => {
                    console.log(val)
                    formik.setFieldValue('discordWebhookIcon', val)
                  }}
                />
                <Form.Input
                  className="w-full"
                  name="discordWebhookName"
                  error={formik.errors.discordWebhookName}
                  onChange={formik.handleChange}
                  value={formik.values.discordWebhookName}
                  placeholder="Ignore to use your discord webhook setting !"
                />
              </FormGroup>

              <div className="text-right">
                <Button loading={loading} title="Test" primary />
                <Button
                  type="submit"
                  loading={loading}
                  title="Save"
                  primary
                  className="ml-5"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
