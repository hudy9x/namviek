import { ReactNode } from 'react'

export default function ListCell({
  width,
  align,
  className,
  children
}: {
  width?: number
  align?: 'center' | 'left' | 'right'
  className?: string
  children: ReactNode
}) {
  const classes: string[] = ['list-cell']
  align && classes.push(align)
  className && classes.push(className)
  return (
    <div className={classes.join(' ')} style={{ width }}>
      {children}
    </div>
  )
}
