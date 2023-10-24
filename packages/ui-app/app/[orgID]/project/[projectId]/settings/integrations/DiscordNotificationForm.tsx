import { Form, messageWarning } from '@shared/ui'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'

export interface IDiscordNotificationDefaultValues {
  discordWebhookUrl: string
  discordWebhookName: string
  discordWebhookIcon: string
  enable: boolean
}

export const defaultFormikValues: IDiscordNotificationDefaultValues = {
  discordWebhookUrl: '',
  discordWebhookName: '',
  discordWebhookIcon: '',
  enable: true
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

      const { error, errorArr } = validateTask(mergedValues)

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
        <form className="task-form space-y-3 gap-6 relative">
          {/* <div className="relative flex items-start bg-gray-50 dark:bg-gray-800 rounded-b-lg">
            Test
  </div> */}
          <div className={`flex items-start gap-3 `}>
            <div className="task-form-detail space-y-3 w-full">
              <Form.Input
                title="Task name"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Enter your task name here !"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
