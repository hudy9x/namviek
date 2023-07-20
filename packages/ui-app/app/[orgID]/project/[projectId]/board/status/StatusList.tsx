import { ReactNode } from 'react'
import { useBoard } from '../hook'
import { TaskStatus } from '.prisma/client'

export const StatusList = ({
  children
}: {
  children: (status: TaskStatus) => ReactNode
}) => {
  const { statusList } = useBoard()
  console.log(statusList, 'statusList')
  return (
    <>
      {statusList.map(status => (
        <div className="p-3 flex bg-white rounded-md shadow-lg shadow-indigo-100">
          {children(status)}
        </div>
      ))}
    </>
  )
}
