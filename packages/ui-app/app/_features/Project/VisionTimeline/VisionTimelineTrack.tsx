import { useState, MouseEvent, useRef, useEffect, useCallback } from 'react'

export default function VisionTimelineTrack({
  id,
  title,
  name,
  startCol,
  endCol,
  height,
  onChange
}: {
  id: string
  title?: string
  name?: string
  startCol: number
  endCol: number
  height: number | string
  onChange?: (start: number, end: number) => void
}) {
  const [position, setPosition] = useState({
    start: startCol,
    end: endCol
  })
  const [stopCounter, setStopCounter] = useState(0)

  const { start, end } = position
  const initX = useRef(0)
  const initEndCol = useRef(0)
  const initStartCol = useRef(0)
  const startDragging = useRef(false)

  const type = useRef<'head' | 'tail'>('head')
  const trackId = useRef('')

  useEffect(() => {
    if (stopCounter && (startCol !== start || endCol !== end)) {
      console.log(id)
      onChange && onChange(start, end)
    }
  }, [start, end, stopCounter])

  const onResizeHead = useCallback(
    (ev: MouseEvent<HTMLDivElement>) => {
      const { pageX } = ev
      if (startDragging.current) return

      type.current = 'head'
      initStartCol.current = start

      startDragging.current = true
      initX.current = pageX
      setStopCounter(0)
    },
    [start]
  )

  const onResizeTail = useCallback(
    (ev: MouseEvent<HTMLDivElement>) => {
      const { pageX } = ev
      if (startDragging.current) return

      type.current = 'tail'
      initEndCol.current = end

      startDragging.current = true
      initX.current = pageX
      setStopCounter(0)

      // console.log(ev)
      // console.log('on start resize ')
    },
    [end]
  )

  useEffect(() => {
    const onResize = (ev: globalThis.MouseEvent) => {
      const initialX = initX.current
      const { pageX } = ev

      if (!startDragging.current) return

      const extraCol = Math.ceil((pageX - initialX) / 32)

      if (type.current === 'tail') {
        const initEnd = initEndCol.current
        setPosition(prev => ({ ...prev, end: initEnd + extraCol }))
      }

      if (type.current === 'head') {
        const initStart = initStartCol.current
        setPosition(prev => ({ ...prev, start: initStart + extraCol }))
      }
    }

    const onStop = () => {
      if (!startDragging.current) return
      startDragging.current = false
      setStopCounter(stopCounter => stopCounter + 1)
      console.log('stop')
    }

    document.addEventListener('mousemove', onResize)
    document.addEventListener('mouseup', onStop)

    return () => {
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', onStop)
    }
  }, [])

  const isDragging = startDragging.current ? 'select-none' : ''

  return (
    <div
      style={{
        height,
        gridColumnStart: start,
        gridColumnEnd: end
        // gridRowStart: index + 1
      }}
      title={title}
      className="px-1 flex items-center relative transition-all">
      <div className="whitespace-nowrap relative text-gray-600 w-full bg-white dark:bg-gray-700 dark:text-gray-200 dark:shadow-gray-900 dark:border-gray-600 px-2.5 py-2 text-sm  rounded-md border border-gray-300 shadow-md shadow-indigo-50">
        <span className={`truncate ${isDragging}`}>{name}</span>
        <div
          onMouseDown={onResizeHead}
          className="absolute -left-1.5 top-0 cursor-w-resize h-full w-[10px] bg-transparent"></div>
        <div
          onMouseDown={onResizeTail}
          className="absolute -right-1.5 top-0 cursor-w-resize h-full w-[10px] bg-transparent hover:bg-gray-200/60 active:bg-red-200/50 rounded-md border border-transparent hover:border-gray-200 border-dashed">
          {/* <div className="h-full w-1 rounded-md bg-gray-200 left-1.5 relative"></div> */}
        </div>
      </div>
    </div>
  )
}
