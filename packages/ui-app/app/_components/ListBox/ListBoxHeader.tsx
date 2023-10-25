import { ReactNode } from 'react'

export default function ListBoxHeader({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 py-2 border-b dark:border-b-gray-800 bg-white dark:bg-gray-900 rounded-t-md flex items-center justify-between z-10">
      {children}
    </div>
  )
}
