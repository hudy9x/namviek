import React, { useCallback } from 'react'
import {
  IListGroupProps,
  useListModeGroupContext
} from './ListModeGroupContext'
import { useTaskStore } from '@/store/task'
import ListModeGroupHeader from './ListModeGroupHeader'
import ListModeGroupBody from './ListModeGroupBody'
import { RiCheckboxMultipleFill } from 'react-icons/ri'

export default function ListModeBody() {
  const { groups } = useListModeGroupContext()
  const { tasks } = useTaskStore()

  const renderToggleCheckboxAll = useCallback(
    (group: IListGroupProps): React.ReactElement => {
      return <RiCheckboxMultipleFill onClick={() => group.onCheckAllToggle()} />
    },
    []
  )

  return (
    <>
      {groups.map(group => (
        <div
          key={group.title}
          className="bg-white dark:bg-gray-900 mb-4 rounded-md border dark:border-gray-800 mx-4 relative mt-4">
          <ListModeGroupHeader
            title={group.title}
            style={group.style}
            renderOptions={() => renderToggleCheckboxAll(group)}
          />
          <ListModeGroupBody
            tasks={tasks.filter(task => group.isTaskOnGroup(task))}
            groupExpr={group.expression}
          />
        </div>
      ))}
    </>
  )
}
