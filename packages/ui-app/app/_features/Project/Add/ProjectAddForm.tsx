'use client'

import { Form, Button, messageError } from '@shared/ui'
import { useFormik } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import { useParams } from 'next/navigation'
import { validateQuickAddProject } from '@shared/validation'
import { projectQuickAdd } from '@/services/project'
import { useProjectStore } from '@/store/project'
import EmojiInput from '@/components/EmojiInput'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import ListPreset from '@/components/ListPreset'

export default function ProjectAddForm({
  setVisible
}: {
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const params = useParams()
  const { addProject } = useProjectStore()

  const formik = useFormik({
    initialValues: {
      icon: 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f375.png',
      name: '',
      desc: ''
    },
    onSubmit: values => {
      const { error, errorArr, data } = validateQuickAddProject(values)
      console.log(values)

      if (!params.orgID) {
        return messageError('Organization ID is not exist')
      }

      if (error) {
        console.log('error')
        formik.setErrors(errorArr)
        return
      }

      setVisible(false)
      projectQuickAdd({
        ...values,
        ...{
          organizationId: params.orgID
        }
      }).then(res => {
        const { status, data } = res.data
        console.log('done')
        if (status !== 200) {
          return
        }

        console.log('add new project to store')
        addProject(data)
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
          title="Desciption"
          name="desc"
          onChange={formik.handleChange}
          value={formik.values.desc}
        />

        <div className="flex justify-end">
          <Button type="submit" title="Create new" block primary />
        </div>
      </form>
    </>
  )
}
