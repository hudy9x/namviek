import { ReactNode, useState } from 'react'
import { FileKitProvider, IFileItem } from './context'
import './style.css'
import FileDrop from './FileDrop'
import FileGet from './FileGet'
import FilePaste from './FilePaste'
import FileCarousel from './FileCarousel'

export default function FileKitContainer({
  taskId,
  fileIds,
  children
}: {
  taskId: string
  fileIds: string[]
  children: ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [previewFiles, setPreviewFiles] = useState<IFileItem[]>([])

  return (
    <FileKitProvider
      value={{
        taskId,
        uploading,
        setUploading,
        loading,
        setLoading,
        previewFiles,
        setPreviewFiles,
        selected,
        setSelected
      }}>
      <FileGet fileIds={fileIds} />
      <FilePaste />
      <FileDrop>{children}</FileDrop>
      <FileCarousel />
    </FileKitProvider>
  )
}
