import { useState } from 'react'
import { Button, messageSuccess, messageError } from '@ui-components'
import { useUser, saveGoalieUser } from '@auth-client'
import { profileService } from '@/services/profile'
import AvatarSelector from './AvatarSelector'
import { FaCamera } from 'react-icons/fa'

export default function AvatarUpdate() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    user?.photo || null
  )
  const [showSelector, setShowSelector] = useState(false)

  const handleAvatarSelect = (avatarPath: string) => {
    setSelectedAvatar(avatarPath)
  }

  const handleUpdateAvatar = async () => {
    if (!selectedAvatar) return

    setIsLoading(true)
    try {
      const { data } = await profileService.updateProfile({
        photo: selectedAvatar
      })

      // Update the user in localStorage with the updated data
      if (data.data && user) {
        // Preserve the existing user data and update with new photo
        saveGoalieUser({
          ...user,
          photo: selectedAvatar
        })
      }

      messageSuccess('Avatar updated successfully')
      setShowSelector(false)
    } catch (error) {
      console.error('Failed to update avatar:', error)
      messageError('Failed to update avatar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="absolute -bottom-16 left-8">
        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-white relative">
          <img
            src={selectedAvatar || user?.photo || ''}
            className="w-full h-full rounded-full object-cover"
          />
          <div 
            className="absolute bottom-0 right-0 bg-gray-800 bg-opacity-70 p-2 rounded-full cursor-pointer"
            onClick={() => setShowSelector(!showSelector)}
          >
            <FaCamera className="text-white text-lg" />
          </div>
        </div>
      </div>

      {showSelector && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg w-[424px] absolute left-1/2 -translate-x-1/2 top-16 z-20">
          <AvatarSelector
            onSelect={handleAvatarSelect}
            currentAvatar={user?.photo || ''}
          />

          <div className="mt-4 flex gap-2">
            <Button
              title="Cancel"
              onClick={() => {
                setSelectedAvatar(user?.photo || null)
                setShowSelector(false)
              }}
              disabled={isLoading}
            />
            <Button
              primary
              title="Update Avatar"
              onClick={handleUpdateAvatar}
              loading={isLoading}
              disabled={
                isLoading || !selectedAvatar || selectedAvatar === user?.photo
              }
            />
          </div>
        </div>
      )}
    </>
  )
}
