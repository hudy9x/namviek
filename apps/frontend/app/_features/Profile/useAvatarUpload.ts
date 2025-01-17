import {
  storageCreatePresignedUrl,
  storagePutFile,
  storageSaveToDrive
} from '@/services/storage'
import { FileOwnerType, FileType } from '@prisma/client'
import { messageError } from '@ui-components'

interface AvatarUploadResult {
  url: string
  fileId: string
}

export default function useAvatarUpload() {
  const uploadAvatar = async (file: File, ownerId: string, orgId: string, projectId: string): Promise<AvatarUploadResult | null> => {
    try {
      // Validate file
      const maxSize = 2 * 1024 * 1024 // 2MB
      if (file.size > maxSize) {
        messageError('Avatar size should not exceed 2MB')
        return null
      }

      if (!file.type.startsWith('image/')) {
        messageError('Please upload an image file')
        return null
      }

      // Get presigned URL
      const res = await storageCreatePresignedUrl({
        orgId,
        projectId,
        name: file.name,
        type: file.type
      })

      const { name, presignedUrl, url } = res.data.data
      const keyName = name as string

      // Upload to S3
      await storagePutFile(presignedUrl, file)

      // Save to database
      const result = await storageSaveToDrive({
        organizationId: orgId,
        name: file.name,
        keyName,
        type: FileType.FILE,
        url,
        size: file.size,
        mimeType: file.type,
        owner: ownerId,
        ownerType: FileOwnerType.USER
      })

      const fileData = result.data.data

      return {
        url: fileData.url,
        fileId: fileData.id
      }
    } catch (error) {
      console.error('Avatar upload error:', error)
      messageError('Failed to upload avatar')
      return null
    }
  }

  return { uploadAvatar }
}
