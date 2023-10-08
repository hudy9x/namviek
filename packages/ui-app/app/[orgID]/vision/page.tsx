'use client'

import { useVisionStore } from '@/store/vision'
import ListCell from '../project/[projectId]/views/ListCell'

export default function Page() {
  const { visions } = useVisionStore()
  return (
    <>
      <div className="bg-indigo-50/50 dark:bg-[#182031]">
        <div className="py-3 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <div className="w-[1120px] mx-auto">
            <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300">
              Vision
            </h2>
          </div>
        </div>
      </div>
      <div
        className="task bg-indigo-50/50 dark:bg-[#182031] w-full"
        style={{ height: `calc(100vh - 53px)` }}>
        <div className="pb-[300px]">
          {visions.map(vs => {
            return (
              <div
                className="relative mx-4 mt-4 mb-4 bg-white border rounded-md dark:bg-gray-900 dark:border-gray-800"
                key={vs.id}>
                <div className="px-3 py-2 border-b dark:border-b-gray-800 sticky top-[45px] bg-white dark:bg-gray-900 rounded-t-md flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase">
                    test
                  </div>

                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500 uppercase">
                    <ListCell width={150}>Assignee</ListCell>
                    <ListCell width={75}>Priority</ListCell>
                    <ListCell width={50}>Point</ListCell>
                    <ListCell width={110}>Duedate</ListCell>
                    <ListCell width={110}>Progress</ListCell>
                    <ListCell width={100}>Created by</ListCell>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
