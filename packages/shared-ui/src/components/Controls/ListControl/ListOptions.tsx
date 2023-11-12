import { ReactNode } from 'react'

export default function ListOptions({
  width,
  children
}: {
  width?: number
  children: ReactNode
}) {
  return (
    <div className="select-options" style={{ width }}>
      {children}
    </div>
  )
}
