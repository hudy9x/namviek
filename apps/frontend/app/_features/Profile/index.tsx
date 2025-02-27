'use client'
import { ChangeEvent, useState } from 'react'
import { useUser } from '@auth-client'
import useAvatarUpload from './useAvatarUpload'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'
import PasswordTab from './PasswordTab'
import ProfileTab from './ProfileTab'
import AvatarUpdate from './AvatarUpdate'

export default function Profile() {
  const { user } = useUser()
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('Password')
  const { uploadAvatar } = useAvatarUpload()

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const result = await uploadAvatar(
      file,
      user?.id || '',
      'orgId',
      'projectId'
    )
  }

  const tabs = [
    // 'My details',
    'Profile',
    'Password'
    // 'Team',
    // 'Plan',
    // 'Billing',
    // 'Email',
    // 'Notifications',
    // 'Integrations',
    // 'API'
  ]

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 sm:py-[50px]">
<div className="max-w-[600px] pb-10 mx-auto bg-white dark:bg-gray-900 sm:rounded-xl shadow-lg overflow-hidden">        {/* Header with Gradient Background */}
        <div className="relative">
          <div className="h-48 w-full bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-500" />
          <Link
            href="/"
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
            <IoClose className="w-5 h-5 text-white" />
          </Link>

          {/* Profile Avatar */}


          {/* Avatar Update Section */}
          <AvatarUpdate />
        </div>

        {/* Profile Content */}
        <div className="px-8">
          {/* Header Info */}
          <div className="mt-20 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">My Profile</h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 mt-8 border-b dark:border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors relative ${
                  activeTab === tab
                    ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                    : ''
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'Password' && <PasswordTab />}
          {activeTab === 'Profile' && <ProfileTab />}
        </div>
      </div>
    </div>
  )
}
