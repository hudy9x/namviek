import { ReactNode } from 'react'
import ListBoxHeader from './ListBoxHeader'
import './style.css'
import ListBoxBody from './ListBoxBody'

export default function ListBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white w-[700px] mt-[70px] mx-auto dark:bg-gray-900 rounded-md border dark:border-gray-800 relative shadow-lg shadow-indigo-100 dark:shadow-gray-900">
      {children}
    </div>
  )
}

ListBox.Header = ListBoxHeader
ListBox.Body = ListBoxBody
