import { ReactNode, useEffect, useRef, useState } from 'react'
import ListPortal from './ListPortal'
import { useListContext } from './context'

export default function ListOptions({
  width,
  minWidth,
  children
}: {
  width?: number
  minWidth?: number
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { visible } = useListContext()
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const elem = ref.current
    if (visible && elem) {
      const rect = elem.getBoundingClientRect()
      setPos({
        top: rect.top,
        left: rect.left
      })
    }
  }, [visible, ref])

  return (<div className="list-portal-container" ref={ref}>
    <ListPortal>
      <div
        className={`select-options ${visible ? 'fixed' : 'hidden -z-10'}`}
        style={{
          width: width || 170,
          minWidth,
          top: pos.top,
          left: pos.left,
          zIndex: 9999
        }}>
        {children}
      </div>
    </ListPortal>
  </div>
  )
}
