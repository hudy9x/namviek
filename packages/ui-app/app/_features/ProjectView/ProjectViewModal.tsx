import { ProjectViewType } from '@prisma/client'
import { useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import {
  HiMiniBars4,
  HiOutlineBars2,
  HiOutlineBars3,
  HiOutlineBars3BottomLeft,
  HiOutlineBars3BottomRight,
  HiOutlineCalendar,
  HiOutlineListBullet,
  HiOutlineRectangleGroup,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlineViewColumns
} from 'react-icons/hi2'

import ProjectViewModalForm from './ProjectViewModalForm'
import { useProjectViewContext } from './context'
import DynamicIcon from '@/components/DynamicIcon'
import IconSelect from '@/components/IconSelect'

export default function ProjectViewModal() {
  const { name, setName, setIcon } = useProjectViewContext()
  const [active, setActive] = useState<ProjectViewType>(ProjectViewType.LIST)
  const [views] = useState([
    {
      icon: 'HiOutlineBars3CenterLeft',
      type: ProjectViewType.LIST,
      title: 'List',
      desc: 'Use List view to organize your tasks in anyway imaginable – sort, filter, group, and customize columns.'
    },
    {
      icon: 'HiOutlineViewColumns',
      type: ProjectViewType.BOARD,
      title: 'Board',
      desc: 'Build your perfect Board and easily drag-and-drop tasks between columns.'
    },
    {
      icon: 'HiOutlineCalendar',
      type: ProjectViewType.CALENDAR,
      title: 'Calendar',
      desc: 'Calendar view is your place for planning, scheduling, and resource management.'
    },
  ])

  const otherViews = [

    // {
    //   icon: <TbTimeline />,
    //   type: ProjectViewType.TIMELINE,
    //   title: 'Timeline',
    //   desc: 'Plan out your work over time. See overlaps, map your schedule out and see it all divided by groups.'
    // },
    {
      icon: 'HiOutlineRocketLaunch',
      type: ProjectViewType.GOAL,
      title: 'Goal',
      desc: 'Set multiple goals'
    },
    {
      icon: 'HiOutlineUserGroup',
      type: ProjectViewType.TEAM,
      title: 'Team',
      desc: 'Monitor what people are working on, what has been done, and who needs more tasks with Team view'
    },
    // {
    //   icon: <HiOutlineClipboardDocumentList />,
    //   type: ProjectViewType.ACTIVITY,
    //   title: 'Acitivity',
    //   desc: 'Get an aggregated view of all activity across a location. Filter for people and type to get granular with the activity you see.'
    // },
    {
      icon: 'HiOutlineRectangleGroup',
      type: ProjectViewType.DASHBOARD,
      title: 'Dashboard',
      desc: 'Have a overlook view'
    }
  ]

  const activeView = views.find(v => v.type === active) || otherViews.find(v => v.type === active)

  return (
    <div className="view-form">
      <div className="view-name-input">
        <IconSelect value={activeView?.icon || 'HiOutlineBars3CenterLeft'} onChange={val => {
          console.log(val)
          setIcon(val)
        }} />
        <input
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder="View name here ..."
          className="text-sm"
        />
      </div>
      <div className="flex items-start w-full">
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
