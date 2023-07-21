import { ReactNode } from 'react'

export const BoardHeaderAction = ({ children }: { children: ReactNode }) => {
  return <div className='hidden group-hover:flex'>{children}</div>
}
