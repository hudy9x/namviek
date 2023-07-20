import { ReactNode } from 'react'

export const StatusContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-4">{children}</div>
}
