'use client'

import { orgUpdateStorageConfig } from '@/services/organization'
import {
  Button,
  Form,
  ListItemValue,
  confirmAlert,
  messageError,
  messageSuccess,
} from '@ui-components'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useUserRole } from '../UserPermission/useUserRole'
import { useGetParams } from '@/hooks/useGetParams'
import ListPreset from '@/components/ListPreset'
import { OrgStorageType } from '@prisma/client'

const STORAGE_TYPES = [
  { id: OrgStorageType.AWS_S3, title: 'AWS S3' },
  { id: OrgStorageType.DIGITAL_OCEAN_S3, title: 'Digital Ocean Spaces' }
]

const List = Form.List

export default function SettingStorageConfiguration() {
  const { orgRole } = useUserRole()
  const { orgId } = useGetParams()
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      type: OrgStorageType.AWS_S3,
      bucketName: '',
      region: '',
      accessKey: '',
      secretKey: '',
      maxStorageSize: '-1',
      endpoint: '' // For DigitalOcean/Minio
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
      orgUpdateStorageConfig(orgId, {
        type: values.type,
        config: {
          bucketName: values.bucketName,
          region: values.region,
          accessKey: values.accessKey,
          secretKey: values.secretKey,
          maxStorageSize: values.maxStorageSize,
          endpoint: values.endpoint
        }
      })
        .then(res => {
          messageSuccess('Save it !')
          setLoading(false)
        })
        .catch(err => {
          if (err?.response?.data?.message) {
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

  const valueType = formik.values.type as OrgStorageType
  const isDigitalOcean = valueType === OrgStorageType.DIGITAL_OCEAN_S3

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <List
          value={STORAGE_TYPES.find(t => t.id === formik.values.type) || STORAGE_TYPES[0]}
          onChange={(val: ListItemValue) => {
            console.log('val', val)
            formik.setFieldValue('type', val.id as OrgStorageType)
          }}
        >
          <List.Button>
            {STORAGE_TYPES.find(t => t.id === formik.values.type)?.title || STORAGE_TYPES[0].title}
          </List.Button>
          <List.Options>
            {STORAGE_TYPES.map(option => (
              <List.Item key={option.id} value={option}>
                {option.title}
              </List.Item>
            ))}
          </List.Options>
        </List>

        {/* {isDigitalOcean && (
          <Form.Input
            title="Region"
            placeholder="nyc3"
            help="Enter your Digital Ocean region (e.g., nyc3, ams3, sgp1)"
            {...registerForm('region', formik)}
          />
        )} */}

        <Form.Input
          title="Access Key"
          {...registerForm('accessKey', formik)}
        />
        <Form.Input
          title="Secret Key"
          type="password"
          {...registerForm('secretKey', formik)}
        />
        <Form.Input
          title={isDigitalOcean ? "Region (e.g., nyc3)" : "AWS Region"}
          {...registerForm('region', formik)}
        />
        <Form.Input
          title={isDigitalOcean ? "Space Name" : "Bucket Name"}
          {...registerForm('bucketName', formik)}
        />

        <ListPreset
          title='Max storage size'
          value={formik.values.maxStorageSize}
          onChange={val => {
            formik.setFieldValue('maxStorageSize', val)
          }}
          options={[
            { id: '-1', title: 'Unlimited' },
            { id: '10', title: '10GB' },
            { id: '20', title: '20GB' },
            { id: '50', title: '50GB' },
            { id: '100', title: '100GB' },
          ]}
        />

        <div className="mt-4 text-right">
          <Button loading={loading} type="submit" title="Save it" primary />
        </div>
      </form>
    </>
  )
}
