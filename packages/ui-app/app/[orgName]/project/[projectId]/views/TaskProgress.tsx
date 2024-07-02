import ProgressBar from "@/components/ProgressBar";
import TaskChecklist from "@/features/TaskChecklist";
import { Popover } from "@shared/ui";
import { useState } from "react";

export default function TaskProgress({ progress, taskId }: { progress: number, taskId: string }) {

  return <div className='relative cursor-pointer'>
    {/* <ProgressBar color="green" progress={progress} /> */}
    {/* {visible ? */}
    {/* <div className='absolute z-10 top-2 right-0'> */}
    {/*   <div className='p-3 border bg-white rounded-md w-[300px]'> */}
    {/*     <TaskChecklist taskId={taskId} /> */}
    {/*   </div> */}
    {/* </div> */}
    {/*   : null} */}

    <Popover
      triggerBy={
        <div>
          <ProgressBar color="green" progress={progress} />
        </div>
      }
      content={
        <div className='px-4 pt-4 pb-1 border bg-white dark:bg-gray-900 dark:border-gray-700 rounded-md w-[300px]'>
          <TaskChecklist taskId={taskId} />
        </div>

      }
    />
  </div>
}
