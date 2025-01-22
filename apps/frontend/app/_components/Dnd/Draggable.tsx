import React, { ReactNode } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface IDragProvider {
  listeners: any
  attributes: any
}

interface IDraggableProps {
  className?: string
  children: (providers: IDragProvider) => ReactNode
  draggableId: string
}
export default function Draggable({
  children,
  draggableId,
  className
}: IDraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: draggableId
    })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform)
      }
    : undefined

  const classes = ['block']
  className && classes.push(className)
  transform && classes.push('fixed z-10')

  return (
    <div
      className={classes.filter(Boolean).join(' ')}
      ref={setNodeRef}
      style={style}>
      {children({ listeners, attributes })}
    </div>
  )
}
