import { Button } from '@shared/ui'
import { useState } from 'react'
import { HiOutlineViewList } from 'react-icons/hi'
import { HiListBullet, HiOutlineCalendar, HiOutlineClipboardDocumentList, HiOutlineRectangleGroup, HiOutlineRocketLaunch, HiOutlineUserGroup, HiOutlineViewColumns } from 'react-icons/hi2'
import { TbTimeline } from "react-icons/tb";

export default function ProjectViewForm() {
  const [active, setActive] = useState(0)
  const [views, setViews] = useState([
    { icon: <HiListBullet />, title: 'List' },
    { icon: <HiOutlineViewColumns />, title: 'Board' },
    { icon: <HiOutlineCalendar />, title: 'Calendar' },
    { icon: <TbTimeline />, title: 'Timeline' },
    { icon: <HiOutlineRocketLaunch />, title: 'Goal' },
    { icon: <HiOutlineUserGroup />, title: 'Team' },
    { icon: <HiOutlineClipboardDocumentList />, title: 'Acitivity' },
    { icon: <HiOutlineRectangleGroup />, title: 'Dashboard' }
  ])

  return (
    <div className="view-form">
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
        <img className='' src="https://app-cdn.clickup.com/list.f86dfb81f1654e162b5d634824f7c6cc.svg" />
        <h2 className='text-xl'>List</h2>
        <p className='text-sm text-gray-500'>Use List view to organize your tasks in anyway imaginable - sort, filter, group and customize columns</p>
        <div>
          <Button primary title='Add List' />
        </div>

      </div>
    </div>
  )
}
