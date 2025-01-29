import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import {
  storageCreatePresignedUrl,
  storagePutFile,
  storageSaveToDrive,
  storageGetObjectUrl
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
} from '@ui-components'
import { AxiosError } from 'axios'
import { useSetDefaultCover } from './useSetDefaultCover'
import { useGetParams } from '@/hooks/useGetParams'

export default function useFileUpload() {
  const { uploading, setUploading, onChange, setPreviewFiles, taskId } = useFileKitContext()
  const { setDefaultCover } = useSetDefaultCover()
  const { orgId } = useGetParams()
  const { projectId, orgName } = useParams()
  const { push } = useRouter()

  const { updateTaskData } = useServiceTaskUpdate()

  const verifyFileUrl = async (url: string) => {
    try {
      console.log('Verifying URL:', url);
      const parsedUrl = new URL(url);
      
      // Check if it's an S3 URL
      if (parsedUrl.hostname.includes('s3.amazonaws.com')) {
        console.log('Detected S3 URL, returning as is');
        return url;
      }
      
      // Check if it's a Digital Ocean URL
      if (parsedUrl.hostname.includes('digitaloceanspaces.com')) {
        console.log('Detected Digital Ocean URL, removing search params');
        parsedUrl.search = ''; // Remove query parameters
        return parsedUrl.toString();
      }

      console.log('Unknown URL type:', parsedUrl.hostname);
      return url;
    } catch (error) {
      console.error('Error parsing URL:', error);
      return url;
    }
  }

  const doUpload = async (f: IFileUploadItem): Promise<IFileItem | null> => {
    try {
      if (!orgId) return null

      const { data: file, randId } = f
      const sliceName = file.name.split('.')

      const res = await storageCreatePresignedUrl({
        orgId,
        projectId,
        name: file.name,
        type: file.type
      })

      const { name, presignedUrl, url } = res.data.data

      console.log('storage create presign', res.data.data, url, presignedUrl)

      const ret = await storagePutFile(presignedUrl, file)

      console.log('ret', ret)

      const verifiedUrl = await verifyFileUrl(url || presignedUrl)

      const result = await storageSaveToDrive({
        organizationId: orgId,
        projectId,
        name: file.name,
        keyName: name,
        type: FileType.FILE,
        url: verifiedUrl,
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
            push(`${orgName}/setting/about`)
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
            push(`${orgName}/setting/about`)

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

    if (onChange && fileIds.length) {
      onChange(fileIds)
      return fileItems
    }

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
    console.log('onFileHandler', taskId)
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
