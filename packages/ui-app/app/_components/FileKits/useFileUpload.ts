import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import {
  storageCreatePresignedUrl,
  storagePutFile,
  storageSaveToDrive
} from '@/services/storage'
import { FileOwnerType, FileStorage, FileType } from '@prisma/client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { IFileItem, IFileUploadItem, isImage, useFileKitContext } from './context'
import {
  confirmAlert,
  confirmWarning,
  messageError,
  messageWarning,
  randomId
} from '@shared/ui'
import { AxiosError } from 'axios'
import { useSetDefaultCover } from './useSetDefaultCover'
import { useEffect, useState } from 'react'
import { onPushStateRun } from 'packages/ui-app/libs/pushState'

export default function useFileUpload() {
  const [taskId, setTaskId] = useState('')
  const { uploading, setUploading, setPreviewFiles } = useFileKitContext()
  const { setDefaultCover } = useSetDefaultCover()
  const { orgID, projectId } = useParams()
  const { push } = useRouter()
  // const sp = useSearchParams()
  // const taskId = sp.get('taskId')

  useEffect(() => {
    const destroy = onPushStateRun((url: string) => {

      const newUrl = new URL(url)
      const taskId = newUrl.searchParams.get('taskId')
      setTaskId(taskId || '')
    })

    return () => {
      destroy()
    }
  }, [])

  useEffect(() => {
    const newUrl = new URL(window.location.toString())
    const taskId = newUrl.searchParams.get('taskId')
    if (taskId) {
      setTaskId(taskId)
    }

  }, [])

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

      console.log('res', res)

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
    } catch (err) {
      console.log('hehheeh', err)
      const error = err as AxiosError
      if (error.code === 'ERR_NETWORK') {
        confirmWarning({
          title: 'Network error',
          message:
            'This error occurs as your network has problems or incorrect storage configuration. Go to Setting > About to make sure that Storage configuration is correct.',
          yes: () => {
            push(`${orgID}/setting/about`)
          }
        })
        return null
      }


      if (error.response && error.response.data === 'STORAGE_CONFIG_NOT_FOUND') {
        confirmWarning({
          title: 'Missing Storage Integration',
          message:
            'Please go to Settings > About to integrate your configuration or use the default limited storage.',
          yes: () => {
            console.log('1')
            push(`${orgID}/setting/about`)

          }
        })
        return null

      }
      if (error.response && error.response.data === 'MAX_SIZE_STORAGE') {
        // messageWarning(
        //   'Your organization has reached to max storage limit. Please contact to admin to upgrade the plan.'
        // )
        confirmWarning({
          title: 'Max storage size',
          message:
            'Your organization has reached to max storage limit. Please contact to admin to upgrade the plan.',
          yes: () => {
            console.log('1')
          }
        })

        return null
      }

      if (error.response && error.response.statusText === 'Forbidden') {
        confirmAlert({
          title: 'Something went wrong',
          message:
            'Make sure that your storage configuration in Setting > About is correct.',
          yes: () => {
            console.log('1')
          }
        })
        return null
      }

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

    console.log('files items', fileItems)

    taskId &&
      fileIds.length &&
      updateTaskData({
        id: taskId,
        fileIds
      }).then(() => {

        // set default cover image
        for (let i = 0; i < fileItems.length; i++) {
          const file = fileItems[i];
          if (isImage(file.mimeType)) {
            setDefaultCover(file.url)
            break
          }

        }
      })

    return fileItems
  }

  const onFileHandler = async (files: FileList) => {
    if (!taskId) {
      messageError("Task id not found")
      return
    }
    if (uploading) {
      messageWarning('Wait a sec, upload is running')
      return
    }
    const maxSizeNum = 5
    const maxSize = maxSizeNum * 1024 * 1024 // Mb

    const previewFiles: IFileItem[] = []
    const uploadFileData: IFileUploadItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const randId = randomId()
      const sliceName = file.name.split('.')

      if (file.size > maxSize) {
        messageError(`File: ${file.name} exceeds ${maxSizeNum} Mb`)
        return
      }

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
