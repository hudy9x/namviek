'use client'
import { ApplicationList } from './ApplicationList'
import CreateApplication from './CreateApplication'

export default function SettingAppsContainer() {
  return (
    <div className="pt-24 mx-auto w-[700px] space-y-4">
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Applications</h2>
        <CreateApplication />
      </div>
      <ApplicationList />
    </div>
  )
}
