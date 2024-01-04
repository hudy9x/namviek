'use client'

import EmojiInput from "@/components/EmojiInput"
import { useDebounce } from "@/hooks/useDebounce"
import { orgGetById, orgUpdate } from "@/services/organization"
import { Button, Form, FormGroup, messageError, messageSuccess } from "@shared/ui"
import { useFormik } from "formik"
import { useParams } from "next/navigation"

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

  return <div className="pt-12 w-[500px] mx-auto">

    <form onSubmit={formik.handleSubmit}>
      <div className="org">
        <div className="org-setup">
          {/* <section className="setup-step mb-4"><span>Step 1/</span>6</section> */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-400 mb-3">
            🖖 Hey,
            <br /> Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
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
              <Button type="submit" title="Save it" primary />{' '}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
}
