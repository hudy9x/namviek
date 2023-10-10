import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import {
  storageCreatePresignedUrl,
  storagePutFile,
  storageSaveToDrive
} from '@/services/storage'
import { FileOwnerType, FileStorage, FileType } from '@prisma/client'
import { useParams, useSearchParams } from 'next/navigation'
import { IFileItem, IFileUploadItem, useFileKitContext } from './context'
import { messageWarning, randomId } from '@shared/ui'

export default function useFileUpload() {
  const { uploading, setUploading, setPreviewFiles } = useFileKitContext()
  const { orgID, projectId } = useParams()
  const sp = useSearchParams()
  const taskId = sp.get('taskId')

  const { updateTaskData } = useServiceTaskUpdate()

  const doUpload = async (f: IFileUploadItem): Promise<IFileItem | null> => {
    try {
      const { data: file, randId } = f
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

      const fileData = result.data.data as FileStorage

      return {
        id: fileData.id,
        uploading: false,
        randId,
        name: file.name,
        ext: sliceName[sliceName.length - 1],
        size: file.size,
        mimeType: file.type,
        keyName: name,
        createdAt: fileData.createdAt || undefined,
        url
      }
    } catch (error) {
      return null
    }
  }

  const uploadFileToS3 = async (
    files: IFileUploadItem[]
  ): Promise<IFileItem[]> => {
    const promises = []

    for (let i = 0; i < files.length; i++) {
      const fileData = files[i]

      promises.push(doUpload(fileData))
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

  const onFileHandler = async (files: FileList) => {
    if (uploading) {
      messageWarning('Wait a sec, upload is running')
      return
    }

    const previewFiles: IFileItem[] = []
    const uploadFileData: IFileUploadItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const randId = randomId()

      const sliceName = file.name.split('.')
      previewFiles.push({
        randId,
        name: file.name,
        uploading: true,
        ext: sliceName[sliceName.length - 1],
        size: file.size,
        mimeType: file.type,
        keyName: '',
        url: window.URL.createObjectURL(file)
      })

      uploadFileData.push({
        randId,
        data: file
      })
    }

    setUploading(true)
    // displays images first
    setPreviewFiles(prev => [...previewFiles, ...prev])

    uploadFileToS3(uploadFileData).then(result => {
      setPreviewFiles(prev =>
        prev.map(f => {
          if (!f.randId) return f

          const found = result.find(r => r.randId === f.randId)
          if (found) {
            return { ...f, ...found }
          }
          return f
        })
      )

      setUploading(false)
    })
  }

  return {
    uploadFileToS3,
    doUpload,
    onFileHandler
  }
}
