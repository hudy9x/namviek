import { ReactNode } from 'react'

export default function ListCell({
  width,
  align,
  children
}: {
  width?: number
  align?: 'center' | 'left' | 'right'
  children: ReactNode
}) {
  const classes: string[] = ['list-cell']
  align && classes.push(align)
  return (
    <div className={classes.join(' ')} style={{ width }}>
      {children}
    </div>
  )
}
