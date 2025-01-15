'use client'

import { Form, Button } from '@shared/ui'
import { useFormik } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import EmojiInput from '@/components/EmojiInput'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import useServiceFavoriteUpdate from '@/hooks/useServiceFavoriteUpdate'
import { useUrl } from '@/hooks/useUrl'
import './favorite-modal.css'

export default function FavoriteAddForm({
  setVisible
}: {
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const { addToFavorite } = useServiceFavoriteUpdate()
  const { url } = useUrl()

  const formik = useFormik({
    initialValues: {
      icon: 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f375.png',
      name: ''
    },
    onSubmit: values => {
      const { name, icon } = values
      addToFavorite({
        name: name,
        icon: icon,
        link: url,
        type: 'PAGE'
      })

      setVisible(false)
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="fav-add-content ">
        <EmojiInput
          className="-mt-11 "
          value={formik.values.icon}
          onChange={val => {
            console.log(val)
            formik.setFieldValue('icon', val)
          }}
        />
        <p className="text-sm text-gray-500">
          Give this URL a short title and an unique icon so that it is easy to
          remember and share
        </p>
        <FormGroup>
          <Form.Input
            required
            className="w-full"
            name="name"
            placeholder="Your title here !"
            error={formik.errors.name}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Button type="submit" title="Done" primary />
        </FormGroup>
      </form>
    </>
  )
}
