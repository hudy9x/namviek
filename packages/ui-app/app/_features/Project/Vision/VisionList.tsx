'use client'

import ProgressBar from '@/components/ProgressBar'
import { format, formatDistanceToNow } from 'date-fns'
import ListCell from 'packages/ui-app/app/[orgID]/project/[projectId]/views/ListCell'
import { useState } from 'react'
import VisionCreate from './VisionCreate'
import { useVisionContext } from './context'
import { Button } from '@shared/ui'
import { HiOutlineTrash } from 'react-icons/hi2'
import ListBox from '@/components/ListBox'
import VisionDelete from './VisionDelete'
import AbsoluteLoading from '@/components/AbsoluateLoading'

export default function ProjectVisionList() {
  const { visions, loading } = useVisionContext()

  return (
    <ListBox className="w-[300px]">
      <AbsoluteLoading enabled={loading} />
      {/* <ListBox.Header> */}
      {/*   <div className="flex gap-2 items-center text-xs uppercase font-bold"> */}
      {/*     <div className="">Vision list</div> */}
      {/*   </div> */}
      {/*   <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500"> */}
      {/*     <ListCell width={80}>Progress</ListCell> */}
      {/*     <ListCell width={110}>Duedate</ListCell> */}
      {/*   </div> */}
      {/* </ListBox.Header> */}

      <ListBox.Body>
        {visions.map(vision => {
          const dueDate = vision.dueDate
          const date = dueDate ? formatDistanceToNow(new Date(dueDate)) : ''

          return (
            <div
              className="px-3 py-2 text-sm flex items-center justify-between group"
              key={vision.id}>
              <div className="flex items-center gap-2 dark:text-gray-300">
                <div className="w-full">{vision.name}</div>
                <div className="list-box-actions group-hover:opacity-100 opacity-0 transition-all">
                  <VisionDelete id={vision.id} />
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                <ListCell width={80}>
                  <ProgressBar color="green" progress={vision.progress || 0} />
                </ListCell>
                {/* <ListCell width={110}>{date}</ListCell> */}
              </div>
            </div>
          )
        })}
        <VisionCreate />
      </ListBox.Body>
    </ListBox>
  )
}
