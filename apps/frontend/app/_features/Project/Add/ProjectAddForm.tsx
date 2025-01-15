'use client'

import {
  Form,
  Button,
  messageError,
  setFixLoading,
  messageSuccess
} from '@shared/ui'
import { useFormik } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import { useParams } from 'next/navigation'
import { validateQuickAddProject } from '@shared/validation'
import { projectQuickAdd } from '@/services/project'
import { useProjectStore } from '@/store/project'
import { useGetParams } from '@/hooks/useGetParams'
import EmojiInput, { randIcon } from '@/components/EmojiInput'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import FormMember from './FormMembers'
import FormProjectView from './FormProjectView'

export default function ProjectAddForm({
  setVisible
}: {
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const { orgId } = useGetParams()
  const { addProject } = useProjectStore()

  const formik = useFormik({
    initialValues: {
      icon: randIcon(),
      name: '',
      views: [],
      members: [],
      desc: ''
    },
    onSubmit: values => {
      const { error, errorArr, data } = validateQuickAddProject(values)

      if (!orgId) {
        return messageError('Organization ID is not exist')
      }

      if (error) {
        formik.setErrors(errorArr)
        return
      }

      setVisible(false)
      setFixLoading(true, { title: `Creating project ${values.name}` })
      projectQuickAdd({
        ...values,
        ...{
          organizationId: orgId
        }
      })
        .then(res => {
          const { status, data } = res.data
          console.log('done')
          setFixLoading(false)
          if (status !== 200) {
            messageError('Create project failed')
            return
          }

          messageSuccess('Create project successfully')
          console.log('add new project to store')
          addProject(data)
        })
        .catch(err => {
          setFixLoading(false)
          console.log('err', err)
        })
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <FormGroup title="Project name">
          <EmojiInput
            value={formik.values.icon}
            onChange={val => {
              console.log(val)
              formik.setFieldValue('icon', val)
            }}
          />
          <Form.Input
            // title="Name"
            required
            className="w-full"
            name="name"
            error={formik.errors.name}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </FormGroup>

        <Form.Textarea
          rows={2}
          title="Desciption"
          name="desc"
          onChange={formik.handleChange}
          value={formik.values.desc}
        />

        <FormProjectView
          onChange={views => {
            console.log('project view changed', views)
            formik.setFieldValue('views', views)
          }}
        />

        <FormMember
          onChange={uids => {
            console.log(uids)
            formik.setFieldValue('members', uids)
          }}
        />

        <div className="flex justify-end">
          <Button type="submit" title="Create new" block primary />
        </div>
      </form>
    </>
  )
}
