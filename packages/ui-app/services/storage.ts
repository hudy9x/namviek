import axios from 'axios'
import { httpDel, httpGet, httpPost } from './_req'
import { FileStorage } from '@prisma/client'

export const storageCreatePresignedUrl = ({
  orgId,
  projectId,
  name,
  type
}: {
  orgId: string
  projectId: string
  name: string
  type: string
}) => {
  console.log('name:', name, type)
  return httpPost('/api/storage/create-presigned-url', {
    orgId,
    projectId,
    name,
    type
  })
}

export const storageGetFiles = (ids: string[]) => {
  return httpGet('/api/storage/get-files', {
    params: {
      ids
    }
  })
}
export const storageDelFile = (id: string, projectId: string) => {
  return httpDel('/api/storage/del-file', {
    params: { id, projectId }
  })
}

export const storagePutFile = (presignedUrl: string, data: File) => {
  return axios.put(presignedUrl, data)
}

export const storageSaveToDrive = (data: Partial<FileStorage>) => {
  return httpPost('/api/storage/save-to-drive', data)
}

export const storageDeleteFile = (name: string) => {
  return httpDel('/api/storage/delete-object', {
    params: {
      name
    }
  })
}

export const storageGetObjectUrl = (name: string) => {
  return httpGet('/api/storage/get-object-url', {
    params: { name }
  })
}
