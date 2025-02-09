'use client'

import { AiOutlineStar } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineRectangleStack } from 'react-icons/hi2'
import { HiOutlineUsers } from 'react-icons/hi'
import './style.css'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import ProjectMemberManager from '../ProjectMemberManager'

const Setting = () => {
  const { push } = useRouter()
  const { orgName, projectId } = useParams()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  const settings = [
   
    {
      icon: (
        <HiOutlineUsers className="shrink-0 text-green-600 w-6 h-6 bg-green-100/80 rounded-full p-1.5" />
      ),
      title: 'Members',
      active: tab === 'members',
      href: `${orgName}/project/${projectId}?mode=setting&tab=members`,
      content: <ProjectMemberManager />,
      desc: 'Where you can send add users to the projects. It also helps you to grant access to a specific member.'
    },
    // {
    //   icon: (
    //     <HiOutlineBellAlert className="shrink-0 text-pink-600 w-6 h-6 bg-pink-100/80 rounded-full p-1.5" />
    //   ),
    //   title: 'Notification',
    //   active: tab === 'notification',
    //   href: `${orgName}/project/${projectId}?mode=setting&tab=notification`,
    //   content: <ProjectNotificationSetting />,
    //   desc: 'Enable automatic notifications to stay on top of important tasks'
    // }
  ]

  const selectedTab = settings.find(s => s.active)

  return (
    <div className="sm:flex gap-8 sm:mx-5 sm:ml-8 sm:mt-8">
      <div className="flex px-4 sm:block sm:w-[350px] sm:space-y-6">
        {settings.map(setting => {
          const activeClass = setting.active
            ? 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg shadow-lg shadow-indigo-100 dark:shadow-gray-900'
            : ''
          const hover =
            'hover:bg-white dark:hover:bg-gray-900/70 hover:rounded-lg hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-gray-900'
          return (
            <div
              onClick={() => {
                push(setting.href)
              }}
              key={setting.title}
              className={`transition-all px-3 py-2 sm:px-4 sm:py-3 cursor-pointer border border-transparent ${hover} ${activeClass}`}>
              <div className="flex gap-2 items-center dark:text-gray-400 text-sm sm:text-base ">
                {setting.icon}
                <span>{setting.title}</span>
              </div>
              <p className="hidden sm:block text-xs text-gray-500 mt-2 leading-5">
                {setting.desc}
              </p>
            </div>
          )
        })}
      </div>
      <div className="px-4 sm:px-0 sm:w-[500px]">
        {selectedTab ? selectedTab.content : null}
      </div>
    </div>
  )
}

export default Setting
