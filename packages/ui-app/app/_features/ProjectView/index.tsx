'use client'

import ProjectViewCreate from './ProjectViewCreate'
import './style.css'
import { useProjectViewList } from './useProjectViewList'
import HasRole from '../UserPermission/HasRole'
import useSetViewFilter from './useSetViewFilter'
import { useState } from 'react'
import ProjectViewUpdate from './ProjectViewUpdate'
import { ProjectViewUpdateProvider } from './updateContext'
import ProjectViewList from './ProjectViewList'


function SetProjectViewFilter() {
  // set the view's filter data
  useSetViewFilter()
  return <></>
}

function VerticalSeparator() {
  const { views } = useProjectViewList()
  if (views.length) {
    return <div className="w-[1px] h-[20px] bg-gray-300 dark:bg-gray-700 mx-2 my-2"></div>
  }

  return null

}

export default function ProjectView() {
  const [projectViewId, setProjectViewId] = useState('')

  return (
    <ProjectViewUpdateProvider value={{
      updateId: projectViewId,
      setUpdateId: setProjectViewId
    }}>
      <SetProjectViewFilter />
      <div className="project-view pl-1 relative">

        <ProjectViewList onUpdate={id => {
          setProjectViewId(id)
        }} />

        <HasRole projectRoles={['MANAGER', 'LEADER']}>
          <VerticalSeparator />
          <ProjectViewCreate />
        </HasRole>

        <HasRole projectRoles={['MANAGER', 'LEADER']}>
          <ProjectViewUpdate id={projectViewId} />
        </HasRole>
      </div>
    </ProjectViewUpdateProvider>
  )
}
