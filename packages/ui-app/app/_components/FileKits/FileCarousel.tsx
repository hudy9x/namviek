import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiXMark
} from 'react-icons/hi2'
import { IFileItem, getIconUrl, isImage, useFileKitContext } from './context'
import { HiOutlineDownload } from 'react-icons/hi'
import { useEffect } from 'react'
import PdfViewer from '../PdfViewer'
import './carousel.css'
import { createPortal } from 'react-dom'

function FileCarouselDisplay({ file }: { file: IFileItem }) {
  if (!file) return null

  const isPdf = file.ext.toLowerCase() === 'pdf'
  const isVideo = file.ext.toLowerCase() === 'mp4'
  const url = isImage(file.mimeType) ? file.url : getIconUrl(file.ext)

  const getPreview = () => {
    if (isPdf && file.url) {
      return (
        <div className="pt-[50px]">
          <PdfViewer src={file.url} />
        </div>
      )
    }

    if (isVideo) {
      console.log(file)
      return (
        <div>
          <video
            style={{
              width: 'calc(100vw - 200px)',
              minWidth: 300,
              maxWidth: 1300,
              maxHeight: '80vh'
            }}
            controls>
            <source src={file.url} type={file.mimeType} />
            Your browser does not support HTML video.
          </video>
        </div>
      )
    }

    return <img src={url} className="max-h-[70vh]" />
  }

  return (
    <div className={`flex flex-col items-center ${isPdf ? 'h-screen' : ''}`}>
      {getPreview()}
      <h2 className="text-xl text-gray-200 mt-4 max-w-[450px] text-center pb-[50px]">
        {file.name}
      </h2>
    </div>
  )
}

function createFileCarouselContainer(id: string) {
  const container = document.createElement('div') as HTMLDivElement

  container.id = id

  document.body.append(container)

  return container
}

function getFileCarouselContainer() {
  const id = 'file-carousel-container'
  let container = document.getElementById(id)

  if (!container) {
    container = createFileCarouselContainer(id)
  }

  return container
}

export default function FileCarousel() {
  const { previewFiles, selected, setSelected } = useFileKitContext()
  const len = previewFiles.length
  const found = previewFiles[selected]
  const nextImage = () => {
    if (selected === len - 1) return
    setSelected(selected + 1)
  }

  const prevImage = () => {
    if (selected === 0) return
    setSelected(selected - 1)
  }

  const onClose = () => {
    setSelected(-1)
    window.stopEscapeKeyCloseModal = false
  }

  useEffect(() => {
    const keyboarHandler = (ev: KeyboardEvent) => {
      ev.stopImmediatePropagation()
      ev.stopPropagation()
      ev.preventDefault()
      if (ev.key.toLowerCase() !== 'escape') return

      setSelected(-1)
      window.stopEscapeKeyCloseModal = false
    }
    document.addEventListener('keyup', keyboarHandler)

    return () => {
      window.stopEscapeKeyCloseModal = false
      document.removeEventListener('keyup', keyboarHandler)
    }
  }, [])

  const view = (
    <div
      className={`file-carousel z-50 fixed top-0 left-0 w-full h-full bg-black/80 mt-0 ${selected !== -1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
      <div className="border-b border-b-gray-700 bg-black dark:border-gray-700 px-4 py-3 flex items-center justify-between text-gray-300">
        <div></div>
        <div className="text-sm">
          {selected + 1}/{len}
        </div>
        <div className="flex items-center gap-2">
          <a href={found ? found.url : ''} target="_blank">
            <HiOutlineDownload className="cursor-pointer w-7 h-7 border rounded-md border-gray-700 p-1" />
          </a>
          <HiXMark
            onClick={onClose}
            className="cursor-pointer w-7 h-7 border rounded-md border-gray-700 p-1"
          />
        </div>
      </div>
      <div className="flex items-center overflow-y-auto justify-between px-8 h-full">
        <HiOutlineChevronLeft
          onClick={prevImage}
          className="carousel-btn left"
        />
        <div className="w-full mx-auto">
          <FileCarouselDisplay file={found} />
        </div>
        <HiOutlineChevronRight
          onClick={nextImage}
          className="carousel-btn right"
        />
      </div>
      {/* <div onClick={onClose} className="w-full h-full"></div> */}
    </div>
  )

  return createPortal(view, getFileCarouselContainer())
}
