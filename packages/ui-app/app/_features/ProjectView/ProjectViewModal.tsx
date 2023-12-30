import { ProjectViewType } from '@prisma/client'
import { useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import {
  HiOutlineCalendar,
  HiOutlineRectangleGroup,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlineViewColumns
} from 'react-icons/hi2'

import ProjectViewModalForm from './ProjectViewModalForm'
import { useProjectViewContext } from './context'

export default function ProjectViewModal() {
  const { name, setName } = useProjectViewContext()
  const [active, setActive] = useState(0)
  const [views] = useState([
    {
      icon: <HiOutlineMenuAlt1 />,
      type: ProjectViewType.LIST,
      title: 'List',
      desc: 'Use List view to organize your tasks in anyway imaginable – sort, filter, group, and customize columns.'
    },
    {
      icon: <HiOutlineViewColumns />,
      type: ProjectViewType.BOARD,
      title: 'Board',
      desc: 'Build your perfect Board and easily drag-and-drop tasks between columns.'
    },
    {
      icon: <HiOutlineCalendar />,
      type: ProjectViewType.CALENDAR,
      title: 'Calendar',
      desc: 'Calendar view is your place for planning, scheduling, and resource management.'
    },
    // {
    //   icon: <TbTimeline />,
    //   type: ProjectViewType.TIMELINE,
    //   title: 'Timeline',
    //   desc: 'Plan out your work over time. See overlaps, map your schedule out and see it all divided by groups.'
    // },
    {
      icon: <HiOutlineRocketLaunch />,
      type: ProjectViewType.GOAL,
      title: 'Goal',
      desc: 'Set multiple goals'
    },
    {
      icon: <HiOutlineUserGroup />,
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
      icon: <HiOutlineRectangleGroup />,
      type: ProjectViewType.DASHBOARD,
      title: 'Dashboard',
      desc: 'Have a overlook view'
    }
  ])

  const activeView = views[active]

  return (
    <div className="view-form">
      <div className="view-name-input">
        {activeView.icon}
        <input
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder="View name here ..."
          className="text-sm"
        />
      </div>
      <div className="flex items-start w-full">
        <div className="view-types">
          {views.map((view, viewIndex) => {
            const { icon, title } = view
            const isActive = viewIndex === active
            return (
              <div
                className={`view-item ${isActive ? 'active' : ''}`}
                key={viewIndex}
                onClick={() => {
                  setActive(viewIndex)
                }}>
                {icon}
                {title}
              </div>
            )
          })}
        </div>
        <div className="view-form-detail">
          <ProjectViewModalForm
            type={activeView.type}
            name={activeView.title}
            desc={activeView.desc}
          />
        </div>
      </div>
    </div>
  )
}
