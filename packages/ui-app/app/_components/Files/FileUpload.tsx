import { storageCreatePresignedUrl, storagePutFile } from '@/services/storage'
import { FileStorage } from '@prisma/client'
import { Scrollbar, messageSuccess, randomId } from '@shared/ui'
import { DragEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import './style.css'
import FileItem from './FileItem'

export type IFileItem = {
  name: string
  size: number
  ext: string
  keyName?: string
  mimeType: string
  data: File
}

export default function FileUpload() {
  const [isDragging, setDragging] = useState(false)
  const idRef = useRef(randomId())
  const [files, setFiles] = useState<IFileItem[]>([])

  const onFileHandler = (files: FileList) => {
    const fileItems: IFileItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const sliceName = file.name.split('.')

      fileItems.push({
        name: file.name,
        ext: sliceName[sliceName.length - 1],
        size: file.size,
        mimeType: file.type,
        data: file
      })
    }

    setFiles(prev => [...prev, ...fileItems])

    console.log('fileItems:', fileItems)
  }

  const onDropFileChange = async (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

    const files = ev.dataTransfer.files
    setDragging(false)
    onFileHandler(files)
  }

  const onInputChange = async (files: FileList) => {
    const len = files.length
    const promises = []

    onFileHandler(files)
    // for (let i = 0; i < len; i++) {
    //   const file = files[i]
    //   console.log('file', file)
    //
    //   promises.push(
    //     storageCreatePresignedUrl({
    //       name: file.name,
    //       type: file.type
    //     }).then(res => {
    //       const { data } = res.data
    //       const { url, presignedUrl } = data
    //
    //       storagePutFile(presignedUrl, file)
    //         .then(res => {
    //           console.log('upload ok', url)
    //           setUrl(url)
    //         })
    //         .catch(err => {
    //           console.log(err)
    //         })
    //       return [file, data]
    //     })
    //   )
    // }

    // await Promise.all(promises).then(results => {
    //   console.log(results)
    // })
  }

  const onPaste = async (e: ClipboardEvent) => {
    e.preventDefault()
    const files = e.clipboardData?.files
    if (!files) return

    messageSuccess('You pasted an image !')
    onFileHandler(files)
  }

  useEffect(() => {
    document.addEventListener('paste', onPaste)
    return () => {
      document.removeEventListener('paste', onPaste)
    }
  }, [])

  return (
    <div
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
      <div
        className={`file-upload-wrapper ${
          isDragging ? 'border-indigo-400' : ''
        }`}>
        {files.length ? (
          <>
            <Scrollbar style={{ height: 300 }}>
              <div className="grid grid-cols-2 gap-2">
                {files.map((file, id) => {
                  return <FileItem key={id} data={file} />
                })}
              </div>
            </Scrollbar>

            <label
              className="btn btn-sm mt-3 cursor-pointer"
              htmlFor={idRef.current}>
              Upload new file
            </label>
          </>
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
