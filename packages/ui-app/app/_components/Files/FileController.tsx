import { storageGetFiles } from '@/services/storage'
import { FileStorage } from '@prisma/client'
import { Scrollbar, messageSuccess, messageWarning, randomId } from '@shared/ui'
import { DragEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import './style.css'
import FileItem from './FileItem'
import useFileUpload, { IFileItem, IFileUploadItem } from './useFileUpload'
import FilePreview from './FilePreview'
import AbsoluteLoading from '../AbsoluateLoading'
import { FileStorageProvider } from './context'
import FileCarousel from './FileCarousel'
import FileDesc from './FileDesc'

export default function FileUpload({
  attachedFileIds
}: {
  attachedFileIds: string[]
}) {
  const [selected, setSelected] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setDragging] = useState(false)
  const { uploadFileToS3 } = useFileUpload()
  const idRef = useRef(randomId())
  const [previewFiles, setPreviewFiles] = useState<IFileItem[]>([])


  const onDropFileChange = async (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

    const files = ev.dataTransfer.files
    setDragging(false)
    onFileHandler(files)
  }

  const onInputChange = async (files: FileList) => {
    onFileHandler(files)
  }

  const onPaste = async (e: ClipboardEvent) => {
    e.preventDefault()
    const files = e.clipboardData?.files
    if (!files) return

    messageSuccess('You pasted an image !')
    onFileHandler(files)
  }

  useEffect(() => {
    if (attachedFileIds.length) {
      storageGetFiles(attachedFileIds)
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
          setPreviewFiles(attachedFiles)
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        })
        .catch(err => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [attachedFileIds])

  useEffect(() => {
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('paste', onPaste)
    }
  }, [])

  return (
    <FileStorageProvider
      value={{
        selected,
        setSelected,
        previewFiles: previewFiles,
        setPreviewFiles: setPreviewFiles
      }}>
      <div
        className="form-control relative"
        onDrop={onDropFileChange}
        onDragOver={ev => {
          ev.preventDefault()
          setDragging(true)
          // console.log('drag over', ev)
        }}
        onDragLeave={() => {
          setDragging(false)
        }}
        onDragEnd={() => {
          setDragging(false)
        }}
        onDragEnter={ev => {
          setDragging(true)
          // ev.preventDefault()
          // console.log(ev)
        }}>
        <AbsoluteLoading enabled={loading} />
        <label>
          Attachments{' '}
          {previewFiles.length ? `(${previewFiles.length} files)` : null}
        </label>
        <div
          className={`file-upload-wrapper ${isDragging ? 'is-dragging' : ''}`}>
          {previewFiles.length ? (
            <FilePreview files={previewFiles} />
          ) : (
            <FileDesc inputId={idRef.current} />
          )}
          <input
            id={idRef.current}
            multiple
            className="hidden"
            type="file"
            onChange={ev => {
              const files = ev.target.files
              files && onInputChange(files)
            }}
          />
        </div>
      </div>
      <FileCarousel />
    </FileStorageProvider>
  )
}
