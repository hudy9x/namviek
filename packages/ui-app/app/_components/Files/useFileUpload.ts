import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import {
  storageCreatePresignedUrl,
  storagePutFile,
  storageSaveToDrive
} from '@/services/storage'
import { FileOwnerType, FileType } from '@prisma/client'
import { useParams, useSearchParams } from 'next/navigation'

export type IFileItem = {
  id?: string
  name: string
  size: number
  ext: string
  keyName?: string
  mimeType: string
  data?: File
  url: string
}
export default function useFileUpload() {
  const { orgID, projectId } = useParams()
  const sp = useSearchParams()
  const taskId = sp.get('taskId')

  const { updateTaskData } = useServiceTaskUpdate()

  const doUpload = async (file: File): Promise<IFileItem | null> => {
    try {
      const sliceName = file.name.split('.')

      const res = await storageCreatePresignedUrl({
        orgId: orgID,
        projectId,
        name: file.name,
        type: file.type
      })

      const { name, presignedUrl, url } = res.data.data
      const keyName = name as string
      await storagePutFile(presignedUrl, file)

      console.time('save-to-drive')

      const result = await storageSaveToDrive({
        organizationId: orgID,
        projectId,
        name: file.name,
        keyName,
        type: FileType.FILE,
        url,
        size: file.size,
        mimeType: file.type,
        owner: taskId,
        ownerType: FileOwnerType.TASK
      })

      console.timeEnd('save-to-drive')

      const fileData = result.data.data

      return {
        id: fileData.id,
        name: file.name,
        ext: sliceName[sliceName.length - 1],
        size: file.size,
        mimeType: file.type,
        keyName: name,
        url
      }
    } catch (error) {
      return null
    }
  }

  const uploadFileToS3 = async (files: FileList): Promise<IFileItem[]> => {
    const promises = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      promises.push(doUpload(file))
    }

    const values = await Promise.all(promises)
    const fileItems: IFileItem[] = []
    const fileIds: string[] = []

    values.map(value => {
      if (value) {
        value.id && fileIds.push(value.id)
        fileItems.push(value)
      }
    })

    console.log(fileIds)

    taskId &&
      fileIds.length &&
      updateTaskData({
        id: taskId,
        fileIds
      })

    return fileItems
  }

  return {
    uploadFileToS3
  }
}
