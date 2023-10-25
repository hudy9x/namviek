import { ReactNode } from 'react'
import ListBoxHeader from './ListBoxHeader'
import './style.css'
import ListBoxBody from './ListBoxBody'

export default function ListBox({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`list-box ${className}`}>{children}</div>
}

ListBox.Header = ListBoxHeader
ListBox.Body = ListBoxBody
