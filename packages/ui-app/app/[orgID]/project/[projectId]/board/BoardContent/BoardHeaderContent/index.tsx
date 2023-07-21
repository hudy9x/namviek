import { TaskStatus } from '@prisma/client'
import { BoardHeaderTitle } from './BoardHeaderTitle'
import { BoardHeaderAction } from './BoardActionHeader'
import { BoardActionCollapse } from './BoardActionHeader/BoardActionCollapse'
import { BoardTaskAdd } from './BoardActionHeader/BoardTaskAdd'

export const BoardHeaderContent = ({ status }: { status: TaskStatus }) => {
  return (
    <div
      style={{ borderColor: `${status.color}` }}
      className=" flex bg-white h-10 px-3 rounded-md shadow-lg shadow-indigo-100 border-t-2">
      <div className="w-48 flex justify-between group cursor-pointer items-center">
        <BoardHeaderTitle name={status.name} />
        <BoardHeaderAction>
          <BoardActionCollapse />
          <BoardTaskAdd />
        </BoardHeaderAction>
      </div>
    </div>
  )
}
