'use client'
import { ChangeEvent, useState } from 'react'
import MemberAvatar from '@/components/MemberAvatar'
import { Button, Form, Dialog } from '@ui-components'
import { useUser } from '@auth-client'
import useAvatarUpload from './useAvatarUpload'
import { useGetParams } from '@/hooks/useGetParams'
import { useParams } from 'next/navigation'

export default function Profile() {
  const { user } = useUser()
  const [isUploading, setIsUploading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { uploadAvatar } = useAvatarUpload()
  // const { orgId } = useGetParams()
  // const { projectId } = useParams()

  // In your file input handler:
  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const result = await uploadAvatar(file, user?.id || '', 'orgId', 'projectId')

    // if (result) {
    //   // Update avatar URL in your UI
    //   setAvatarUrl(result.url)
    // }
  }

  const handleUploadImage = () => {
    setIsUploading(true)
    // Implement image upload logic here
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Edit Profile</h1>
        <p className="text-gray-500">Set up your profile and preferences</p>
      </div>

      <div className="profile-content">
        <div className="avatar-section">
          <MemberAvatar uid={user?.id || ''} size="lg" />
          <div className="avatar-actions">
            <Button
              onClick={handleUploadImage}
              loading={isUploading}
              size="sm"
              primary
              title="Upload new picture"
            />

          </div>
        </div>

        <div className="form-section">
          <Form.Input
            required
            title="Name"
            name="name"
            type="text"
            placeholder="Your full name"
            size="lg"
          />

          <Form.Input
            title="Location"
            name="location"
            type="text"
            size="lg"
            placeholder="City, Country"
          />

          <Form.Textarea
            title="Bio"
            name="bio"
            placeholder="Brief description for your profile"
            rows={4}
          />

          <div className="mt-6">
            <Button
              title="Save Changes"
              type="submit"
              primary
              block
            />
          </div>
        </div>
      </div>
    </div>
  )
}
