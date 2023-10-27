import EmojiInput from '@/components/EmojiInput'
import { DiscordWebhook } from '@prisma/client'
import {
  Button,
  Form,
  FormGroup,
  messageError,
  messageSuccess,
  messageWarning
} from '@shared/ui'
import { validateDiscordWebhook } from '@shared/validation'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { IDiscordWebhookDefaultValues } from './DiscordWebhookContainer'
import { discordWebhookSendNotification } from '@/services/discordWebhook'

interface IDiscordWebhookFormProps {
  defaultValue: IDiscordWebhookDefaultValues
  onSubmit: (v: IDiscordWebhookDefaultValues) => void
}

export default function DiscordWebhookForm({
  defaultValue,
  onSubmit
}: IDiscordWebhookFormProps) {
  console.log('defaultValue:', defaultValue)
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const refDefaultValue = useRef<IDiscordWebhookDefaultValues>(defaultValue)
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

      const { error, errorArr } = validateDiscordWebhook(mergedValues)

      if (error) {
        setLoading(false)
        //This form only require one field: `url`
        messageError(errorArr['url'])
        console.error(errorArr)
        return
      }

      console.log(values)
      onSubmit(mergedValues)
      messageSuccess('Save success !')
      setLoading(false)
    }
  })

  const handleTestWebhook = () =>
    discordWebhookSendNotification(refDefaultValue.current)
      .then(res => messageSuccess(res.data.message))
      .catch(err => {
        messageError('Create new task error')
        console.log(err)
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
                name="url"
                value={formik.values.url}
                onChange={formik.handleChange}
                placeholder="Enter your discord webhook url !"
              />
              <FormGroup title="Bot's name">
                <EmojiInput
                  value={formik.values.botIcon}
                  onChange={val => {
                    console.log(val)
                    formik.setFieldValue('botIcon', val)
                  }}
                />
                <Form.Input
                  className="w-full"
                  name="botName"
                  error={formik.errors.botName}
                  onChange={formik.handleChange}
                  value={formik.values.botName}
                  placeholder="Ignore to use your discord webhook setting !"
                />
              </FormGroup>

              <div className="text-right">
                <Button
                  loading={loading}
                  title="Test"
                  onClick={handleTestWebhook}
                />
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
