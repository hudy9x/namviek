import { ReactNode, useState } from 'react'
import { FileKitProvider, IFileItem } from './context'
import './style.css'
import FileDrop from './FileDrop'
import FileGet from './FileGet'
import FilePaste from './FilePaste'

export default function FileKitContainer({
  fileIds,
  children
}: {
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
    </FileKitProvider>
  )
}
