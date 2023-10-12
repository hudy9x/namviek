import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiXMark
} from 'react-icons/hi2'
import { IFileItem, getIconUrl, isImage, useFileKitContext } from './context'
import { HiOutlineDownload } from 'react-icons/hi'
import { useEffect } from 'react'

function FileCarouselDisplay({ file }: { file: IFileItem }) {
  if (!file) return null

  const url = isImage(file.mimeType) ? file.url : getIconUrl(file.ext)

  return (
    <div className="flex flex-col items-center">
      <img src={url} className="max-h-[70vh]" />
      <h2 className="text-xl text-gray-200 mt-4 max-w-[450px] text-center">
        {file.name}
      </h2>
    </div>
  )
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

  return (
    <div
      className={`z-10 fixed top-0 left-0 w-full h-full bg-black/80 mt-0 ${
        selected !== -1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
      <div className="flex items-center justify-between px-8 h-full">
        <HiOutlineChevronLeft
          onClick={prevImage}
          className="w-14 h-14 p-3 rounded-full bg-white/10 cursor-pointer hover:text-gray-400 text-white"
        />
        <FileCarouselDisplay file={found} />
        <HiOutlineChevronRight
          onClick={nextImage}
          className="w-14 h-14 p-3 rounded-full bg-white/10 cursor-pointer hover:text-gray-400 text-white"
        />
      </div>
      {/* <div onClick={onClose} className="w-full h-full"></div> */}
    </div>
  )
}
