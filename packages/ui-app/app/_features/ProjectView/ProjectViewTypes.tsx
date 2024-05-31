import { ProjectViewType } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import DynamicIcon from '@/components/DynamicIcon'
import { useDefaultViewTypes } from './useDefaultViewTypes'

export default function ProjectViewTypes({
  active,
  setActive
}: {
  active: ProjectViewType
  setActive: Dispatch<SetStateAction<ProjectViewType>>
}) {
  const { views, otherViews } = useDefaultViewTypes()

  return (
    <div className="view-types">
      <div className='pl-3 text-[10px] uppercase text-gray-500'>Popular</div>
      {views.map((view, viewIndex) => {
        const { icon, title, type } = view
        const isActive = type === active
        return (
          <div
            className={`view-item ${isActive ? 'active' : ''}`}
            key={viewIndex}
            onClick={() => {
              setActive(type)
            }}>
            <DynamicIcon name={icon} />
            {title}
          </div>
        )
      })}

      <div className='pl-3 text-[10px] uppercase text-gray-500 pt-5'>Other</div>
      {otherViews.map((view, viewIndex) => {
        const { icon, title, type } = view
        const isActive = type === active
        return (
          <div
            className={`view-item ${isActive ? 'active' : ''}`}
            key={viewIndex}
            onClick={() => {
              setActive(type)
            }}>
            <DynamicIcon name={icon} />
            {title}
          </div>
        )
      })}
    </div>
  )
}
