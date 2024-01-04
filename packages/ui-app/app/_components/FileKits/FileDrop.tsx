import { ReactNode, useRef, useState, DragEvent } from 'react'
import useFileUpload from './useFileUpload'

export default function FileDrop({ children }: { children: ReactNode }) {
  const [dragging, setDragging] = useState(false)
  const { onFileHandler } = useFileUpload()

  const onDropFileChange = async (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

    setDragging(false)
    const files = ev.dataTransfer.files

    onFileHandler(files)
  }

  const dragoverTimeout = useRef(0)

  return (
    <div
      className={`file-drop-zone`}
      onDrop={onDropFileChange}
      onDragOver={ev => {
        ev.preventDefault()
        // if (!ev.dataTransfer.files.length) return
        if (!ev.dataTransfer.types.includes('Files')) return
        setDragging(true)
      }}
      onDragOverCapture={ev => {
        if (dragoverTimeout.current) clearTimeout(dragoverTimeout.current)
        // if (!ev.dataTransfer.files.length) return
        if (!ev.dataTransfer.types.includes('Files')) return
        setDragging(true)
      }}
      onDragLeave={() => {
        dragoverTimeout.current = setTimeout(() => {
          console.log('clear dragging mode')
          setDragging(false)
        }, 200) as unknown as number
      }}>
      {dragging ? (
        <div className="file-drop-label">
          <h2 className="text-gray-500 text-lg">Drop file here !</h2>
        </div>
      ) : null}

      {children}
    </div>
  )
}
