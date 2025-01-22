'use client'
import { useServiceOrgMember } from '@/hooks/useServiceOrgMember'
import { useOrgMemberGet } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import {
  Avatar,
  Button,
  confirmAlert,
  messageSuccess
} from '@ui-components'
import { HiOutlineTrash } from 'react-icons/hi2'
import SettingPeopleDelete from './SettingPeopleDelete'

export default function SettingPeopleMemberList() {
  const { orgMembers } = useOrgMemberStore()
  const { removeMemberFromOrg } = useServiceOrgMember()
  useOrgMemberGet()

  return <div className="grid grid-cols-2 gap-2 mt-5">
    {orgMembers.map(mem => {
      return (
        <div
          key={mem.id}
          className="flex group items-center justify-between gap-2 py-2 px-3 bg-white dark:bg-gray-900 dark:border-gray-700 rounded-md border shadow-lg shadow-indigo-100 dark:shadow-gray-900 dark:divide-gray-700">
          <div className="flex items-center gap-2">
            <Avatar src={mem.photo || ''} name={mem.name || ''} />
            <section className="text-gray-600 dark:text-gray-400">
              <h2>{mem.name}</h2>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {mem.email}
              </div>
            </section>
          </div>
          <div>
            <div className='group-hover:block hidden'>
              <SettingPeopleDelete
                className=''
                id={mem.id}
                email={mem.email} />
            </div>
          </div>
        </div>
      )
    })}
  </div>
}
