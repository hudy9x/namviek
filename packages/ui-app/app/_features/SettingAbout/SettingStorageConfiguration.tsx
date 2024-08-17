'use client'

import { orgUpdateStorageConfig } from '@/services/organization'
import {
  Button,
  Form,
  confirmAlert,
  messageError,
  messageSuccess
} from '@shared/ui'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useUserRole } from '../UserPermission/useUserRole'
import { useGetParams } from '@/hooks/useGetParams'
import ListPreset from '@/components/ListPreset'

export default function SettingStorageConfiguration() {
  const { orgRole } = useUserRole()
  const { orgId } = useGetParams()
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      bucketName: '',
      region: '',
      accessKey: '',
      secretKey: '',
      maxStorageSize: '-1'
    },
    onSubmit: values => {
      if (!orgId) return

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

      const maxSize = parseInt(values.maxStorageSize, 10)
      if (isNaN(maxSize)) {
        messageError('Invalid max storage size')
        return
      }

      setLoading(true)
      orgUpdateStorageConfig(orgId, values)
        .then(res => {
          messageSuccess('Save it !')
          setLoading(false)
        })
        .catch(err => {
          if (err && err.response && err.response.data && err.response.data.message) {
            messageError(err.response.data.message)
          } else {
            messageError('Cannot save configuration')

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
    <>
      <form onSubmit={formik.handleSubmit} className="">
        <Form.Input
          title="Aws access key"
          {...registerForm('accessKey', formik)}
        />
        <Form.Input
          title="Aws secret key"
          {...registerForm('secretKey', formik)}
        />
        <Form.Input title="Aws region" {...registerForm('region', formik)} />
        <Form.Input
          title="Aws bucket name"
          {...registerForm('bucketName', formik)}
        />
        <ListPreset title='Max storage size'
          value={formik.values.maxStorageSize}
          onChange={val => {
            console.log('storage size', val)
            formik.setFieldValue('maxStorageSize', val)
          }}
          options={[
            { id: '-1', title: 'Unlimited' },
            { id: '10', title: '10GB' },
            { id: '20', title: '20GB' },
            { id: '50', title: '50GB' },
            { id: '100', title: '100GB' },
          ]} />
        <div className="mt-4 text-right">
          <Button loading={loading} type="submit" title="Save it" primary />{' '}
        </div>
      </form>
    </>
  )
}
