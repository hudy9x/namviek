import MemberAvatar from '@/components/MemberAvatar'
import { Form, Button, messageError, messageSuccess, useForm } from '@shared/ui'

import { validateProfileUser } from '@shared/validation'
import { useState } from 'react'

interface IProfile {
  name: string
  location: string
  bio: string
  oldPassword: string
  newPassword: string
  uid: string
}

interface ProjectUpdateFormProps {
  userId: string
}

const httpPost = (data: any) =>
  fetch('http://localhost:8080/api/v2/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify(data)
  }).then(res => res.json())

export default function ProfileUpdateForm({ userId }: ProjectUpdateFormProps) {
  const [loading, setLoading] = useState(false)
  const { regField, regHandleSubmit } = useForm({
    values: {
      name: '',
      location: '',
      bio: '',
      oldPassword: '',
      newPassword: '',
      uid: userId
    },
    validateFn: values => {
      return validateProfileUser(values)
    },
    onSubmit: values => {
      submitHandler({
        name: values.name,
        location: values.location,
        bio: values.bio,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        uid: userId
      })
    }
  })

  const submitHandler = (profile: IProfile) => {
    setLoading(true)
    httpPost(profile)
      .then(res => {
        console.log({ res })
        messageSuccess('Update profile successfully!')
      })
      .catch(err => {
        if (err.response.status === 403) {
          messageError('Invalid old password')
        } else {
          messageError('Your email or password are invalid')
        }
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center ">
      <div className="flex gap-4">
        <MemberAvatar uid={userId} size="lg" noName />
        <Button title="Upload new picture" />
      </div>
      <form
        onSubmit={regHandleSubmit}
        className="flex flex-col mb-6 gap-4 w-1/2 lg:w-3/4">
        <Form.Input
          title="Name"
          required
          className="w-full"
          {...regField('name')}
        />
        <Form.Input title="Location" {...regField('location')} />
        <Form.Textarea rows={3} title="Bio" {...regField('bio')} />
        <Form.Input
          title="Old password"
          type="password"
          required
          {...regField('oldPassword')}
        />
        <Form.Input
          title="New password"
          type="password"
          {...regField('newPassword')}
        />
        <div className="space-y-3 mt-2">
          <Button loading={loading} title="Change" type="submit" primary />
        </div>
      </form>
    </div>
  )
}
