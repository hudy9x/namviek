'use client'

import { orgStorageGet, orgUpdateStorageConfig } from '@/services/organization'
import {
  Button,
  Form,
  confirmAlert,
  messageError,
  messageSuccess
} from '@shared/ui'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserRole } from '../UserPermission/useUserRole'

export default function SettingStorageConfiguration() {
  const { orgRole } = useUserRole()
  const { orgID } = useParams()
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      bucketName: '',
      region: '',
      accessKey: '',
      secretKey: ''
    },
    onSubmit: values => {
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
      setLoading(true)
      orgUpdateStorageConfig(orgID, values)
        .then(res => {
          console.log(res)
          messageSuccess('Save it !')
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          messageError('Cannot save configuration')
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
          title="Aws bucket"
          {...registerForm('bucketName', formik)}
        />
        <div className="mt-4 text-right">
          <Button loading={loading} type="submit" title="Save it" primary />{' '}
        </div>
      </form>
    </>
  )
}
