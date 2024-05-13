'use client'

import { Button, Form, FormGroup, Loading, messageError, messageWarning } from '@shared/ui'
import { useFormik } from 'formik'
import { orgCreate } from '../../../services/organization'
import { Organization } from '@prisma/client'
import { useRouter } from 'next/navigation'
import EmojiInput from '@/components/EmojiInput'
import { AxiosError } from 'axios'
import { useState } from 'react'

export default function CreateOrganization() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      cover: 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f344.png',
    },
    onSubmit: values => {
      if (!values.name) {
        messageError('Title is required !')
        return
      }

      setLoading(true)

      orgCreate(values).then(res => {
        const { status } = res
        const { data } = res.data
        const org = data as Organization

        if (status !== 200) {
          setLoading(false)
          messageError('Cannot create organization')
          return
        }
        push(`/${org.id}/my-works`)
      }).catch(err => {
        const error = err as AxiosError
        if (error && error.response?.data === 'REACHED_MAX_ORGANIZATION') {
          messageWarning('Sorry, You have created more than 2 organization. Please contact admin to upgrade')

          console.log(err)
        }
        setLoading(false)
      })
    }
  })

  const registerForm = (
    name: keyof typeof formik.values,
    handler: typeof formik
  ) => {
    return {
      name,
      error: handler.errors[name],
      value: handler.values[name],
      onChange: handler.handleChange
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="org">
        <div className="org-setup relative">
          <Loading.Absolute enabled={loading} title='Submitting' />
          {/* <section className="setup-step mb-4"><span>Step 1/</span>6</section> */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-400 mb-3">
            Hey fen, 🖖
            <br /> Lets create your organization
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Tell us more about your organization so we can provide personalized
            experience tailored to your needs and preferences
          </p>

          <div className="org-form mt-4 space-y-4">
            <FormGroup title='Organization name'>
              <EmojiInput value={formik.values.cover} onChange={val => {
                formik.setFieldValue('cover', val)
              }} />

              <Form.Input
                className='w-full'
                {...registerForm('name', formik)}
              />
            </FormGroup>
            <Form.Textarea
              title="Description"
              {...registerForm('desc', formik)}
            />
            <div>
              <Button type="submit" title="Create now" primary />{' '}
              <Button onClick={() => push('/organization')} title="Back" />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
