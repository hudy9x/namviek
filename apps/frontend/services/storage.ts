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
  console.log('name: 1', name, type)
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
export const storageDelFile = ({ id, projectId, orgId }: {
  id: string,
  projectId: string,
  orgId: string
}) => {
  return httpDel('/api/storage/del-file', {
    params: { id, orgId, projectId }
  })
}

export const storagePutFile = (presignedUrl: string, data: File) => {
  const url = new URL(presignedUrl);
  const headers: Record<string, string> = {};
  
  // Only add x-amz-acl header for Digital Ocean URLs
  if (url.hostname.includes('digitaloceanspaces.com')) {
    headers['x-amz-acl'] = 'public-read';
  }

  return axios.put(presignedUrl, data, { headers })
}

export const storageSaveToDrive = (data: Partial<FileStorage>) => {
  return httpPost('/api/storage/save-to-drive', data)
}

export const storageGetObjectUrl = async (params: { 
  keyName: string; 
  orgId: string 
}) => {
  return httpGet('/api/storage/get-object-url', { params })
}
