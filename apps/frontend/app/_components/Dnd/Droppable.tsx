import React, { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'

interface IDroppableProps {
  className?: string
  type?: string
  children: ReactNode
  droppableId: string
}
export default function Droppable({
  children,
  droppableId,
  type,
  className
}: IDroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
    data: { type }
  })

  const classes = [className || '']
  isOver && classes.push('is-dragging-over')

  return (
    <div ref={setNodeRef} className={classes.filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
