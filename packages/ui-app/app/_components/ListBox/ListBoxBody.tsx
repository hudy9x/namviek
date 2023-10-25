import { ReactNode } from 'react'

export default function ListBoxBody({ children }: { children: ReactNode }) {
  return <div className="divide-y dark:divide-gray-800">{children}</div>
}
