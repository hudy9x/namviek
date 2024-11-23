import { storageGetFiles } from '@/services/storage'
import { FileStorage } from '@prisma/client'
import { useEffect, useRef } from 'react'
import { IFileItem, useFileKitContext } from './context'

export default function useFileGet(fileIds: string[]) {
  const { setLoading, setPreviewFiles } = useFileKitContext()
  const filled = useRef(false)

  useEffect(() => {
    // if (fileIds.length && !filled.current) {
    setLoading(true)
    if (fileIds.length) {
      storageGetFiles(fileIds)
        .then(res => {
          const files = res.data.data as FileStorage[]
          const attachedFiles: IFileItem[] = []

          files.map(f => {
            const sliceName = f.name.split('.')

            attachedFiles.push({
              id: f.id,
              uploading: false,
              name: f.name,
              createdAt: f.createdAt || undefined,
              size: f.size || 0,
              ext: sliceName[sliceName.length - 1],
              mimeType: f.mimeType || '',
              url: f.url || ''
            })
          })
          filled.current = true
          setPreviewFiles(attachedFiles)
          setTimeout(() => {
            setLoading(false)
          }, 400)
        })
        .catch(err => {
          setLoading(false)
        })
    } else {
      setPreviewFiles([])
      setLoading(false)
    }

    return () => {
      setLoading(false)
    }
  }, [fileIds])
}
