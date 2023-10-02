import axios from 'axios'
import { httpDel, httpGet, httpPost } from './_req'

export const storageCreatePresignedUrl = ({
  name,
  type
}: {
  name: string
  type: string
}) => {
  console.log('name:', name, type)
  return httpPost('/api/storage/create-presigned-url', {
    name,
    type
  })
}

export const storagePutFile = (presignedUrl: string, data: File) => {
  return axios.put(presignedUrl, data)
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
