import { ReactNode, memo, useState } from 'react'
import { FileKitProvider, IFileItem } from './context'
import './style.css'
import FileGet from './FileGet'
import FileCarousel from './FileCarousel'

function FileKitProviderContainer({
  taskId,
  fileIds,
  onChange,
  children
}: {
  taskId: string
  fileIds: string[]
  onChange?: (fileIds: string[]) => void
  children: ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [previewFiles, setPreviewFiles] = useState<IFileItem[]>([])

  return (
    <FileKitProvider
      value={{
        onChange,
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

export default memo(FileKitProviderContainer)
