import { ProjectViewType } from '@prisma/client'
import { useEffect, useState } from 'react'

import ProjectViewModalForm from './ProjectViewModalForm'
import { useProjectViewContext } from './context'
import { useProjectViewUpdateContext } from './updateContext'
import ProjectViewTypes from './ProjectViewTypes'
import ProjectViewTitle from './ProjectViewTitle'
import { useDefaultViewTypes } from './useDefaultViewTypes'

export default function ProjectViewModal() {
  const { icon } = useProjectViewContext()
  const { isUpdate, type } = useProjectViewUpdateContext()
  const [active, setActive] = useState<ProjectViewType>(ProjectViewType.LIST)
  const { views, otherViews } = useDefaultViewTypes()

  // as user edit a view, update the selected type
  useEffect(() => {
    if (isUpdate && type) {
      setActive(type)
    }
  }, [isUpdate, type])

  // set selected view icon
  const activeView = views.find(v => v.type === active) || otherViews.find(v => v.type === active)
  let iconName = activeView?.icon || 'HiOutlineBars3CenterLeft'

  if (isUpdate && icon) {
    iconName = icon
  }

  return (
    <div className="view-form">
      <ProjectViewTitle iconName={iconName} />
      <div className="flex items-start w-full">
        <ProjectViewTypes active={active} setActive={setActive} />
        <div className="view-form-detail">
          {activeView ? <ProjectViewModalForm
            type={activeView.type}
            name={activeView.title}
            desc={activeView.desc}
          /> : null}
        </div>
      </div>
    </div>
  )
}
