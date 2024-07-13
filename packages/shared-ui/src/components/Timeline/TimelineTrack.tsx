import {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  useCallback,
  ReactNode
} from 'react'

function getPointer() {
  let pointElem = document.querySelector('#point') as HTMLDivElement

  if (!pointElem) {
    pointElem = document.createElement('div') as HTMLDivElement
    pointElem.id = 'point'
    document.body.appendChild(pointElem)
  }

  return pointElem
}

// for dubugging
function startDebugPointer({ top, left }: { top: number, left: number }) {
  const pointElem = getPointer()

  pointElem.style.top = `${top}px`
  pointElem.style.left = `${left}px`
}

// for debugging
function moveDebugPointer({ width }: { width: number }) {
  const pointElem = getPointer()
  const col = document.querySelector('.timeline-day-col')
  const colRect = col?.getBoundingClientRect()
  const colW = colRect ? colRect.width : 0

  pointElem.style.width = `${width}px`
  pointElem.innerText = `${width} - ${Math.ceil(width / colW)}`
}

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
      const { pageX, pageY } = ev
      if (startDragging.current) return

      type.current = 'head'
      initStartCol.current = start

      startDragging.current = true
      initX.current = pageX
      setStopCounter(0)

      // startPointer({ left: pageX, top: pageY })

    },
    [start]
  )

  const onResizeTail = useCallback(
    (ev: MouseEvent<HTMLDivElement>) => {
      const { pageX, pageY } = ev
      if (startDragging.current) return

      type.current = 'tail'
      initEndCol.current = end

      startDragging.current = true
      initX.current = pageX
      setStopCounter(0)

      // startPointer({ left: pageX, top: pageY })

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

      const col = document.querySelector('.timeline-day-col')
      const colRect = col?.getBoundingClientRect()
      const w = colRect ? colRect.width : 0

      const deltaX = pageX - initialX
      const totalCol = deltaX / w
      const dir = totalCol < 0 ? -1 : 1
      const extraCol = Math.ceil(Math.abs(totalCol)) * dir



      // const debugWidth = Math.abs(pageX - initialX)

      if (type.current === 'tail') {
        const initEnd = initEndCol.current
        setPosition(prev => ({ ...prev, end: initEnd + extraCol }))

        // movePointer({ width: debugWidth })
      }

      if (type.current === 'head') {
        const initStart = initStartCol.current
        setPosition(prev => ({ ...prev, start: initStart + extraCol }))

        // movePointer({ width: debugWidth })
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
