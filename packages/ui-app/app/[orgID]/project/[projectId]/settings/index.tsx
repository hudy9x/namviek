'use client'

import { AiOutlineStar } from 'react-icons/ai'
import ProjectPoint from './ProjectPoint'
import { HiOutlineRectangleStack } from 'react-icons/hi2'
import { HiOutlineLink, HiOutlineUsers } from 'react-icons/hi'
import './style.css'

const Setting = () => {
  const settings = [
    {
      icon: (
        <AiOutlineStar className="shrink-0 text-orange-400 w-6 h-6 bg-orange-100/50 rounded-full p-1" />
      ),
      title: 'Points',
      active: true,
      desc: 'Story points are an Agile estimation technique that gives you a relative estimate of how much work and effort will go into a particular task.'
    },
    {
      icon: (
        <HiOutlineRectangleStack className="shrink-0 text-blue-500 w-6 h-6 bg-blue-100/90 rounded-full p-1.5" />
      ),
      title: 'Statuses',
      active: false,
      desc: 'Project status refers to the level of progress it achieves in working toward an end goal.'
    },
    {
      icon: (
        <HiOutlineLink className="shrink-0 text-violet-600 w-6 h-6 bg-violet-100/80 rounded-full p-1.5" />
      ),
      title: 'Integrations',
      active: false,
      desc: 'Tools you can incorporate into the Slack interface to expand your remote work capabilities. It lets you access more functionalities from a single platform.'
    },
    {
      icon: (
        <HiOutlineUsers className="shrink-0 text-green-600 w-6 h-6 bg-green-100/80 rounded-full p-1.5" />
      ),
      title: 'Members',
      active: false,
      desc: 'Where you can send add users to the projects. It also helps you to grant access to a specific member.'
    }
  ]
  return (
    <div className="flex gap-8 ml-8 mt-8">
      <div className="w-[350px] space-y-6">
        {settings.map(setting => {
          const active = setting.active
            ? 'bg-white border-gray-200 rounded-lg shadow-lg shadow-indigo-100'
            : ''
          const hover =
            'hover:bg-white hover:rounded-lg hover:shadow-lg hover:shadow-indigo-100'
          return (
            <div
              key={setting.title}
              className={`px-4 py-3 cursor-pointer border border-transparent ${hover} ${active}`}>
              <div className="flex gap-2 items-center ">
                {setting.icon}
                <span>{setting.title}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 leading-5">
                {setting.desc}
              </p>
            </div>
          )
        })}
      </div>
      <div className="w-[500px]">
        <ProjectPoint />
      </div>
    </div>
  )
}

export default Setting
