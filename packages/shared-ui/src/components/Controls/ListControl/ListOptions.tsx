import { ReactNode } from 'react'

export default function ListOptions({
  width,
  minWidth,
  children
}: {
  width?: number
  minWidth?: number
  children: ReactNode
}) {
  return (
    <div className="select-options" style={{ width, minWidth }}>
      {children}
    </div>
  )
}
