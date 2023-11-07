import {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  useCallback,
  ReactNode
} from 'react'

export default function TimelineTrack({
  id,
  title,
  name,
  startCol,
  endCol,
  height,
  children,
  onChange
}: {
  id: string
  title?: string
  name?: string
  startCol: number
  endCol: number
  children: ReactNode
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

  useEffect(() => {
    if (stopCounter && (startCol !== start || endCol !== end)) {
      console.log('on change')
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
    }

    document.addEventListener('mousemove', onResize)
    document.addEventListener('mouseup', onStop)

    return () => {
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', onStop)
    }
  }, [])

  return (
    <div
      style={{
        height,
        gridColumnStart: start,
        gridColumnEnd: end
        // gridRowStart: index + 1
      }}
      title={title}
      className="timeline-track">
      <div className="timeline-track-container select-none">
        {children}
        {/* <span className={`truncate ${isDragging}`}>{name}</span> */}
        <div
          onMouseDown={onResizeHead}
          className="timeline-track-handler left"></div>
        <div
          onMouseDown={onResizeTail}
          className="timeline-track-handler right"></div>
      </div>
    </div>
  )
}
