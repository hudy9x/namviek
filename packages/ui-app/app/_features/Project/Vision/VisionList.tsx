'use client'

import ProgressBar from '@/components/ProgressBar'
import { format, formatDistanceToNow } from 'date-fns'
import ListCell from 'packages/ui-app/app/[orgID]/project/[projectId]/views/ListCell'
import { useState } from 'react'
import VisionCreate from './VisionCreate'
import { useVisionContext } from './context'
import ListBoxHeader from '@/components/ListBox/ListHeader'

export default function ProjectVisionList() {
  const { visions } = useVisionContext()
  return (
    <div className="vision">
      <div className="bg-white w-[700px] mt-[70px] mx-auto dark:bg-gray-900 rounded-md border dark:border-gray-800 relative shadow-lg shadow-indigo-100 dark:shadow-gray-900">
        <ListBoxHeader>
          <div className="flex gap-2 items-center text-xs uppercase font-bold">
            <div className="">Vision list</div>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
            <ListCell width={120}>Progress</ListCell>
            <ListCell width={75}>Duedate</ListCell>
          </div>
        </ListBoxHeader>

        <div className="divide-y dark:divide-gray-800">
          {visions.map(vision => {
            const dueDate = vision.dueDate
            const date = dueDate ? formatDistanceToNow(dueDate) : ''

            return (
              <div
                className="px-3 py-2 text-sm flex items-center justify-between group"
                key={vision.id}>
                <div className="flex items-center gap-2 dark:text-gray-300">
                  <div className="w-full">
                    {vision.id} {vision.name}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                  <ListCell width={120}>
                    <ProgressBar
                      color="green"
                      progress={vision.progress || 0}
                    />
                  </ListCell>
                  <ListCell width={75}>{date}</ListCell>
                </div>
              </div>
            )
          })}
          <VisionCreate />
        </div>
      </div>
    </div>
  )
}
