import { ReactNode, useState } from 'react'
import { FileKitProvider, IFileItem } from './context'
import './style.css'
import FileGet from './FileGet'
import FileCarousel from './FileCarousel'

export default function FileKitProviderContainer({
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
      {children}
      {/* <FilePaste /> */}
      {/* <FileDrop>{children}</FileDrop> */}
      <FileCarousel />
    </FileKitProvider>
  )
}
