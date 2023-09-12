import { StorageType } from '@prisma/client'
import { AxiosProgressEvent } from 'axios'
import { useParams } from 'next/navigation'
import { httpPut } from 'packages/goalie-nextjs/src/services/_req'
import { useState } from 'react'
import { httpPost } from './_req'
import { useUser } from '@goalie/nextjs'

const storageGetUrl = (orgId: string, path: string) => {
  return httpPost<{ type: StorageType; url: string }>(`/api/upload-file`, {
    orgId,
    path
  })
}

const s3PutObject = (
  file: File,
  url: string,
  onProgressChange: (progressEvent: AxiosProgressEvent) => void
) => {
  return httpPut<string>(url, file, {
    onUploadProgress: onProgressChange
  })
}

export const useUploadFile = () => {
  const { orgID } = useParams()
  const { user } = useUser()

  const [progress, setProgress] = useState(100)
  const [loading, setLoading] = useState(false)

  const uploadFile = async (file: File | null) => {
    try {
      setLoading(true)
      if (!file || !user) return
      const { name } = file

      const now = new Date().getTime()

      const path = `${orgID}/${user.id}/${now}-${name}`

      const parseProgress = (progressEvent: AxiosProgressEvent) => {
        const progressPercentage =
          (progressEvent.loaded / Number(progressEvent.total)) * 100
        setProgress(progressPercentage)
      }

      const { data } = await storageGetUrl(orgID, path)

      switch (data.type) {
        case StorageType.AWS_S3:
          await s3PutObject(file, data.url, parseProgress)
      }
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return { uploadFile, progress, loading }
}
