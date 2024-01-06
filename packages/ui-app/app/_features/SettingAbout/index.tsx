'use client'

import EmojiInput from "@/components/EmojiInput"
import { useDebounce } from "@/hooks/useDebounce"
import { orgGetById, orgUpdate } from "@/services/organization"
import { Button, Form, FormGroup, messageError, messageSuccess } from "@shared/ui"
import { useFormik } from "formik"
import { useParams } from "next/navigation"
import SettingStorageConfiguration from "./SettingStorageConfiguration"

export default function SettingAboutContent() {
  const { orgID } = useParams()
  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      cover: 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f344.png',
    },
    onSubmit: values => {
      console.log(values)
      orgUpdate({
        id: orgID,
        name: values.name,
        cover: values.cover,
        desc: values.desc
      }).then(res => {
        messageSuccess('Updated successully')
        console.log(res)
      }).catch(err => {
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

  return <div className="pt-12 w-[850px] ml-12">

    <div className="org">
      <div className="org-setup space-y-8">

        <form onSubmit={formik.handleSubmit} className="flex items-start gap-12">
          <aside className="w-[300px] shrink-0">
            <h2 className="font-bold text-lg dark:text-gray-300 mb-2">Information</h2>
            <p className="text-sm text-gray-500">All your organization information here</p>
          </aside>

          <main className="w-full space-y-4 bg-white dark:bg-gray-900/70 px-6 py-8 border rounded-lg dark:border-gray-700 shadow-md dark:shadow-gray-900" >
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
            <div className="org-form mt-4 space-y-4 text-right">
              <Button type="submit" title="Save it" primary />{' '}
            </div>
          </main>

        </form>


        <SettingStorageConfiguration />

      </div>
    </div>
  </div>
}
