'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Organization } from '@prisma/client'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
import { orgGet } from '../../services/organization'

export default function OrgList() {
  const { push } = useRouter()
  const [orgs, setOrgs] = useState<Organization[]>([])
  console.log('root page')

  useEffect(() => {
    orgGet().then(res => {
      const { data, status } = res.data
      if (status !== 200) {
        return
      }

      console.log(data)

      // if use have no organization
      if (!data || !data.length) {
        push('/organization/create')
        return
      }

      setOrgs(data)

      console.log(data)
    })
  }, [])

  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-800">
      <div className="w-full h-[200px] bg-indigo-500"></div>
      <div className="w-[900px] m-auto -mt-[140px]">
        <h2 className="font-bold text-2xl text-white">Your organizations</h2>
        <p className="text-indigo-200 text-sm mt-2">
          Select one for work. Next time, we will redirect you to the last
          selected organization.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <Link href={`/organization/create`}>
            <div className="box border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-3 items-center justify-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
              <AiOutlinePlus className="w-5 h-5 -ml-4" />
              <h2>Create organization</h2>
            </div>
          </Link>
          {orgs.map(org => {
            return (
              <Link key={org.id} href={`/${org.id}/my-works`}>
                <div className="box border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-3 items-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
                  <img
                    className="w-10 h-10 rounded-md"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vanamo_Logo.png/600px-Vanamo_Logo.png?20120915115534"
                  />
                  <h2>{org.name}</h2>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
