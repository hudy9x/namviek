import { useState } from 'react'
import { HiOutlineViewList } from 'react-icons/hi'

export default function ProjectViewForm() {
  const [active, setActive] = useState(0)
  const [views, setViews] = useState([
    { icon: <HiOutlineViewList />, title: 'List' },
    { icon: <HiOutlineViewList />, title: 'Board' },
    { icon: <HiOutlineViewList />, title: 'Calendar' },
    { icon: <HiOutlineViewList />, title: 'Timeline' },
    { icon: <HiOutlineViewList />, title: 'Goal' },
    { icon: <HiOutlineViewList />, title: 'Team' },
    { icon: <HiOutlineViewList />, title: 'Acitivity' },
    { icon: <HiOutlineViewList />, title: 'Dashboard' }
  ])

  return (
    <div className="flex items-start">
      <div className="view-types shrink-0 w-[200px]">
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
      <div className="view-form"></div>
    </div>
  )
}
