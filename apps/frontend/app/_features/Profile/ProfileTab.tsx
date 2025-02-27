import { Button, Form, messageSuccess, messageError } from '@ui-components'
import Link from 'next/link'
import { useUser, saveGoalieUser } from '@auth-client'
import { useState } from 'react'
import { profileService } from '@/services/profile'
import { User } from '@prisma/client'
import AvatarUpdate from './AvatarUpdate'

export default function ProfileTab() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: '',  // Default to empty string since bio might not exist
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data } = await profileService.updateProfile({
        name: formData.name,
        bio: formData.bio,
      })

      const resp = data.data as User
      console.log(resp)

      // Update the user in localStorage with the updated data
      if (resp && user) {
        // Preserve the existing user data and update with new data
        saveGoalieUser({
          ...user,
          name: resp.name,
          photo: resp.photo
          // Don't include bio in the saved user since it's not part of GoalieUser type
        })
      }

      messageSuccess('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
      messageError('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      
      {/* Profile Form Section */}
      <form onSubmit={handleSubmit} className="mt-8">
        <Form.Input
          title="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4"
        />

        <Form.Textarea
          title="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="mb-6"
          rows={4}
          placeholder="Tell us about yourself..."
        />

        <div className="flex justify-end gap-3 mt-4">
          <Link href="/">
            <Button size="md" title="Back" />
          </Link>
          <Button
            primary
            size="md"
            title="Save changes"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  )
}
