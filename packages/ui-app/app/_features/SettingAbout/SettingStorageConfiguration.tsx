import { orgStorageGet, orgUpdateStorageConfig } from "@/services/organization";
import { Button, Form, messageError, messageSuccess } from "@shared/ui";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingStorageConfiguration() {
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

      setLoading(true)
      orgUpdateStorageConfig(orgID, values).then(res => {
        console.log(res)
        messageSuccess('Save it !')
        setLoading(false)
      }).catch(err => {
        console.log(err)
        messageError('Cannot save configuration')
        setLoading(false)
      })
      // orgUpdate({
      //   id: orgID,
      //   name: values.name,
      //   cover: values.cover,
      //   desc: values.desc
      // }).then(res => {
      //   messageSuccess('Updated successully')
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })

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

  useEffect(() => {
    orgStorageGet(orgID).then(res => {
      console.log(res)
      const { data } = res.data
      const config = data as {
        bucketName: string
        region: string
        secretKey: string
        accessKey: string
      }
      formik.setValues(config)
    })
  }, [orgID])

  return <>
    <form onSubmit={formik.handleSubmit} className="flex items-start gap-12">
      <aside className="w-[300px] shrink-0">
        <h2 className="font-bold text-lg mb-2 dark:text-gray-300">Storage configuration</h2>
        <p className="text-sm text-gray-500">Go to aws console to get these information. Read this tutorial</p>
      </aside>

      <main className="w-full space-y-4 bg-white dark:bg-gray-900/70 px-6 py-8 border rounded-lg dark:border-gray-700 shadow-md dark:shadow-gray-900" >
        <Form.Input title="Aws access key"
          {...registerForm('accessKey', formik)}
        />
        <Form.Input title="Aws secret key"
          {...registerForm('secretKey', formik)}
        />
        <Form.Input title="Aws region"
          {...registerForm('region', formik)}
        />
        <Form.Input title="Aws bucket"
          {...registerForm('bucketName', formik)}
        />
        <div className="mt-4 text-right">
          <Button loading={loading} type="submit" title="Save it" primary />{' '}
        </div>
      </main>

    </form>


  </>
}
