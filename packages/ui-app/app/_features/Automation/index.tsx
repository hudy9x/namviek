'use client'
import './style.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import AutomateWhen from './AutomateWhen'
import AutomateThen from './AutomateThen'
import { useState } from 'react'
import { AutomateProvider, THEN, WHEN } from './context'
import AutomateCreate from './AutomateCreate'
import { IAutomateThenProps, IAutomateWhenProps } from '@/store/automation'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Automation() {
  const { orgID, projectId } = useParams()
  const [when, setWhen] = useState<IAutomateWhenProps>({
    happens: 'task',
    is: WHEN.PROGRESS_CHANGED,
    valueFrom: '',
    valueTo: '',
    equal: ''
  })

  const [then, setThen] = useState<IAutomateThenProps>({
    change: THEN.CHANGE_STATUS,
    value: ''
  })

  return (
    <div>
      <AutomateProvider
        value={{
          when,
          setWhen,
          then,
          setThen
        }}>
        <div className="automation-wrapper w-[900px] mx-auto mt-10">
          <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
            <Link href={`/${orgID}/project/${projectId}?mode=automation`}>
              <HiOutlineChevronLeft className="bg-white dark:bg-gray-900 dark:border-gray-700 border p-1 w-7 h-7 rounded-md" />
            </Link>
            <span>Create custom automation</span>
          </h2>
          <div className="relative">
            <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <HiOutlineChevronRight className="w-12 h-12 p-3 text-gray-400 bg-white dark:bg-gray-900 dark:border-gray-700 rounded-lg border " />
            </div>
            <div className="automation-container">
              <AutomateWhen />
              <AutomateThen />
            </div>
          </div>
          <AutomateCreate />
        </div>
      </AutomateProvider>
    </div>
  )
}
