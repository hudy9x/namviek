import { ReactNode } from 'react'
import './style.css'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'base' | 'lg'
  bordered?: boolean
  hoverable?: boolean
}

export default function Card({ 
  children, 
  className = '',
  padding = 'base',
  bordered = true,
  hoverable = false
}: CardProps) {
  const classes = [
    'card',
    `p-${padding}`,
    bordered ? 'bordered' : '',
    hoverable ? 'hoverable' : '',
    className
  ].filter(Boolean)

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  )
}

// Sub-components for better organization
Card.Header = function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  )
}
