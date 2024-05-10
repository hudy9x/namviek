'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Organization } from '@prisma/client'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
import { orgGet } from '../../services/organization'
import { dateFormat } from '@shared/libs'
import { formatDistanceToNowStrict } from 'date-fns'

export default function OrgList() {
  // const { push } = useRouter()
  const [orgs, setOrgs] = useState<Organization[]>([])

  useEffect(() => {
    orgGet().then(res => {
      const { data, status } = res.data
      if (status !== 200) {
        return
      }

      // if use have no organization
      if (!data || !data.length) {
        // push('/organization/create')
        return
      }

      setOrgs(data)
    })
  }, [])

  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-800">
      <div className="w-full h-[200px] bg-indigo-500"></div>
      <div className="mx-5 sm:w-[900px] sm:mx-auto -mt-[140px]">
        <h2 className="font-bold text-2xl text-white">Your organizations</h2>
        <p className="text-indigo-200 text-sm mt-2">
          Select one for work. Next time, the app will redirect you to the last
          selected organization.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Link href={`/organization/create`}>
            <div className="box border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-3 items-center justify-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
              <AiOutlinePlus className="w-5 h-5 -ml-4" />
              <h2>Create organization</h2>
            </div>
          </Link>
          {orgs.map(org => {
            const createdAt = org.createdAt ? formatDistanceToNowStrict(new Date(org.createdAt), { addSuffix: true }) : null
            return (
              <Link key={org.id} href={`/${org.id}/my-works`}>
                <div className="box px-8 border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-5 items-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
                  <img
                    className="w-10 h-10 rounded-md"
                    alt='Organization cover'
                    src={org.cover || ''}
                  />
                  <div className='text-zinc-700'>
                    <h2 className='font-medium'>{org.name}</h2>
                    <small className='text-xs text-zinc-400'>{createdAt}</small>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
