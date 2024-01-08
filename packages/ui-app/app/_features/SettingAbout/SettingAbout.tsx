'use client'

import EmojiInput from '@/components/EmojiInput'
import { useDebounce } from '@/hooks/useDebounce'
import { orgGetById, orgUpdate } from '@/services/organization'
import {
  Button,
  Form,
  FormGroup,
  confirmAlert,
  messageSuccess
} from '@shared/ui'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useUserRole } from '../UserPermission/useUserRole'

export default function SettingAbout() {
  const { orgID } = useParams()
  const { orgRole } = useUserRole()
  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      cover:
        'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f344.png'
    },
    onSubmit: values => {
      console.log(values)
      if (orgRole !== 'ADMIN') {
        confirmAlert({
          title: 'Restrict Action !',
          message:
            'Sorry, you do not have permission to do this action. Please contact to admin.',
          yes: () => {
            console.log(1)
          }
        })
        return
      }
      orgUpdate({
        id: orgID,
        name: values.name,
        cover: values.cover,
        desc: values.desc
      })
        .then(res => {
          messageSuccess('Updated successully')
          console.log(res)
        })
        .catch(err => {
          console.log(err)
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

  useDebounce(() => {
    orgGetById(orgID).then(res => {
      const { data } = res.data

      formik.setValues({
        name: data.name,
        cover: data.cover,
        desc: data.desc
      })
    })
  }, [orgID])

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup title="Organization name">
        <EmojiInput
          value={formik.values.cover}
          onChange={val => {
            formik.setFieldValue('cover', val)
          }}
        />

        <Form.Input className="w-full" {...registerForm('name', formik)} />
      </FormGroup>

      <Form.Textarea title="Description" {...registerForm('desc', formik)} />
      <div className="org-form mt-4 space-y-4 text-right">
        <Button type="submit" title="Save it" primary />{' '}
      </div>
    </form>
  )
}
