import FileKitContainer from '@/components/FileKits'
import { useFileKitContext } from '@/components/FileKits/context'
import useFileUpload from '@/components/FileKits/useFileUpload'
import MemberAvatar from '@/components/MemberAvatar'
import { profileUpdate } from '@/services/profile'
import { useMemberStore } from '@/store/member'
import { useUser } from '@goalie/nextjs'
import { User } from '@prisma/client'
import { Form, Button, messageError, messageSuccess, useForm } from '@shared/ui'

import { validateProfileUser } from '@shared/validation'
import Avatar from 'packages/shared-ui/src/components/Avatar'
import { useEffect, useRef, useState } from 'react'

interface IProfile extends Partial<User> {
  newPassword: string
}

interface ProjectUpdateFormProps {
  userId: string
}

export default function ProfileUpdateForm({ userId }: ProjectUpdateFormProps) {
  const { user, setUser } = useUser()
  const photo = user?.photo
  const [loading, setLoading] = useState(false)
  const { regField, regHandleSubmit } = useForm({
    values: {
      name: '',
      country: '',
      bio: '',
      password: '',
      newPassword: '',
      id: userId
    },
    validateFn: values => {
      return validateProfileUser(values)
    },
    onSubmit: values => {
      submitHandler({
        name: values.name,
        country: values.country,
        bio: values.bio,
        password: values.password,
        newPassword: values.newPassword,
        id: userId
      })
    }
  })

  const submitHandler = (profile: IProfile) => {
    setLoading(true)
    profileUpdate(profile)
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

  const { onFileHandler } = useFileUpload()
  const { previewFiles } = useFileKitContext()

  useEffect(() => {
    const lastFileUrl = previewFiles?.[-1]?.url
    user && lastFileUrl && setUser({ ...user, photo: lastFileUrl })
  }, [previewFiles, user, setUser])

  const onInputChange = (files: FileList) => {
    onFileHandler(files)
  }

  const avatarInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <FileKitContainer fileIds={photo ? [photo] : []}>
        <div className="flex gap-4">
          {photo ? (
            <Avatar size="lg" src={photo} name={user?.name || 'None'} />
          ) : (
            <MemberAvatar uid={userId} size="lg" noName />
          )}
          <Button
            title="Upload new picture"
            onClick={() => avatarInputRef.current?.click()}
          />
          <input
            ref={avatarInputRef}
            multiple={false}
            className="hidden"
            type="file"
            onChange={ev => {
              const files = ev.target.files
              files && files.length && onInputChange(files)
            }}
          />
        </div>
      </FileKitContainer>
      <form
        onSubmit={regHandleSubmit}
        className="flex flex-col mb-6 gap-4 w-1/2 lg:w-3/4">
        <Form.Input
          title="Name"
          required
          className="w-full"
          {...regField('name')}
        />
        <Form.Input title="Location" {...regField('country')} />
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
