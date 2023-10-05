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

export default function FileUpload({
  attachedFileIds
}: {
  attachedFileIds: string[]
}) {
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setDragging] = useState(false)
  const { uploadFileToS3 } = useFileUpload()
  const idRef = useRef(randomId())
  const [previewFiles, setPreviewFiles] = useState<IFileItem[]>([])

  const onFileHandler = async (files: FileList) => {
    if (uploading) {
      messageWarning('Wait a sec, upload is running')
      return
    }

    const previewFiles: IFileItem[] = []
    const uploadFileData: IFileUploadItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const randId = randomId()

      const sliceName = file.name.split('.')
      previewFiles.push({
        randId,
        name: file.name,
        uploading: true,
        ext: sliceName[sliceName.length - 1],
        size: file.size,
        mimeType: file.type,
        keyName: '',
        url: window.URL.createObjectURL(file)
      })

      uploadFileData.push({
        randId,
        data: file
      })
    }

    setUploading(true)
    // displays images first
    setPreviewFiles(prev => [...previewFiles, ...prev])

    uploadFileToS3(uploadFileData).then(result => {
      setPreviewFiles(prev =>
        prev.map(f => {
          if (!f.randId) return f

          const found = result.find(r => r.randId === f.randId)
          if (found) {
            return { ...f, ...found }
          }
          return f
        })
      )

      setUploading(false)
    })
  }

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
    }
  }, [attachedFileIds])

  useEffect(() => {
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('paste', onPaste)
    }
  }, [])

  return (
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
        className={`file-upload-wrapper ${
          isDragging ? 'border-indigo-400' : ''
        }`}>
        {previewFiles.length ? (
          <FilePreview files={previewFiles} />
        ) : (
          <div className="flex items-center flex-col text-sm gap-2 text-gray-400">
            <AiOutlineCloudUpload className="w-8 h-8 shadow-sm border rounded-md bg-white p-1.5 text-gray-500" />
            <p className="text-center">
              <label
                className="underline cursor-pointer hover:text-gray-600"
                htmlFor={idRef.current}>
                Browse file to upload
              </label>
              , drag n drop{' '}
              <span className="block">Or paste your image here</span>
            </p>
          </div>
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
  )
}
