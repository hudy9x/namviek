'use client'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Organization } from '@prisma/client'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'
import { orgGet } from '../../services/organization'
import { dateFormat } from '@shared/libs'
import { formatDistanceToNowStrict } from 'date-fns'
import { setOrgInfo } from 'packages/ui-app/layouts/OrgSection'
import { motion } from "framer-motion";

function LoadingSkeleton({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return <>{[1, 2, 3].map(item => {
    return <motion.div
      key={item}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="box px-8 border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-5 items-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
      <div
        className="animate-pulse w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md"
      />
      <div className='flex flex-col gap-1 text-zinc-700 dark:text-zinc-400'>
        <h2 className='font-medium bg-gray-100 h-[15px] w-[100px] dark:bg-gray-700 rounded-md animate-pulse text-transparent'>No title</h2>
        <small className='text-xs h-[10px] w-[70px] animate-pulse text-transparent bg-gray-100 dark:bg-gray-700 rounded-md'>No title</small>
      </div>
    </motion.div>

  })}</>
}

function CreateOrgBtn() {
  return <Link href={`/organization/create`}>
    <div className="box border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-3 items-center justify-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
      <AiOutlinePlus className="w-5 h-5 -ml-4" />
      <h2>Create organization</h2>
    </div>
  </Link>
}

export default function OrgList() {
  // const { push } = useRouter()
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)

  const clearLoading = () => setTimeout(() => {
    setLoading(false)
  }, 200)

  useEffect(() => {
    setLoading(true)
    orgGet().then(res => {
      const { data, status } = res.data
      clearLoading()
      if (status !== 200) {
        return
      }

      // if use have no organization
      if (!data || !data.length) {
        // push('/organization/create')
        return
      }

      setOrgs(data)
    }).catch(err => {
      console.log(err)
      clearLoading()
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
          <CreateOrgBtn />

          <LoadingSkeleton enabled={loading} />

          {!loading && orgs.map(org => {
            const createdAt = org.createdAt ? formatDistanceToNowStrict(new Date(org.createdAt), { addSuffix: true }) : null
            return (
              <Link onClick={() => {
                setOrgInfo({
                  name: org.name,
                  cover: org.cover || ''
                })
              }} key={org.id} href={`/${org.id}/my-works`}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="box px-8 border dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900 flex h-[100px] gap-5 items-center cursor-pointer hover:border-indigo-300 text-indigo-800 dark:text-indigo-400">
                  <img
                    className="w-10 h-10 rounded-md"
                    alt='Organization cover'
                    src={org.cover || ''}
                  />
                  <div className='flex flex-col text-zinc-700 dark:text-zinc-400'>
                    <h2 className='font-medium'>{org.name}</h2>
                    <small className='text-xs text-zinc-400 dark:text-zinc-600'>{createdAt}</small>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
