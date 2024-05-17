import { ReactNode } from 'react'
import SettingTabLayout from './SettingTab'

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="project-nav">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-xl font-bold px-4 py-2 pb-[4px]">Settings</h2>

        <SettingTabLayout />
      </div>

      <div
        className="task bg-indigo-50/50 dark:bg-[#182031] w-full"
        style={{ height: `calc(100vh - 83px)` }}>
        {children}
      </div>
    </div>
  )
}
