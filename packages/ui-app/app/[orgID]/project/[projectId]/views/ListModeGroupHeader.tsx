import { useProjectStatusStore } from '@/store/status'
import React from 'react'
import ListCell from './ListCell'

export default function ListModeGroupHeader({
  title,
  style,
  renderOptions
}: {
  title: string
  style?: React.CSSProperties
  renderOptions?: () => React.ReactElement
}) {
  const { statusLoading } = useProjectStatusStore()
  return (
    <div className="px-3 py-2 border-b dark:border-b-gray-800 top-[45px] bg-white dark:bg-gray-900 rounded-t-md flex items-center justify-between z-10">
      <div
        style={style}
        className="flex gap-2 items-center text-xs uppercase font-bold group">
        {/* <TaskCheckAll /> */}
        <div className={`status-name ${statusLoading ? 'loading' : ''}`}>
          {title}
        </div>
        <div className="hidden group-hover:block cursor-pointer">
          {renderOptions && renderOptions()}
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
        <ListCell width={150}>Assignee</ListCell>
        <ListCell width={75}>Priority</ListCell>
        <ListCell width={50}>Point</ListCell>
        <ListCell width={110}>Duedate</ListCell>
        <ListCell width={100}>Created by</ListCell>
      </div>
    </div>
  )
}
