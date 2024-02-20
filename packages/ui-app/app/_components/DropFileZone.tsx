import { DragEvent, ReactNode, useState } from 'react'

interface IDropFileZoneProps {
  className?: string
  children?: ReactNode
  onChange?: (files: File[]) => void
}

export default function DropFileZone({
  className,
  children,
  onChange
}: IDropFileZoneProps) {
  const [enable, setEnable] = useState(false)
  const onDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()

    setEnable(false)

    const results: File[] = []

    if (ev.dataTransfer.items) {
      const items = ev.dataTransfer.items

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file') {
          const file = item.getAsFile()
          file && results.push(file)
        }
      }
    } else {
      const files = ev.dataTransfer.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        results.push(file)
      }
    }

    onChange && onChange(results)
  }

  const onDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    console.log('over')
    setEnable(true)
  }
  const onDragStop = () => {
    console.log('exit')
    setEnable(false)
  }

  return (
    <div
      className={`${className} ${enable ? 'droppable' : ''}`}
      onDragOver={onDragOver}
      onDragExit={onDragStop}
      onDragEnd={onDragStop}
      onDragLeaveCapture={onDragStop}
      onDrop={onDrop}>
      {children}
    </div>
  )
}
