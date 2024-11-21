import { memo } from "react";
import { Button } from '@shared/ui'
import { HiOutlineXMark } from 'react-icons/hi2'
import { useServiceTaskUpdate } from "@/hooks/useServiceTaskUpdate";

function RemoveTaskFromGoal({ taskId }: { taskId: string }) {
  const { updateTaskData } = useServiceTaskUpdate()
  const onRemove = () => {
    console.log('taskId', taskId)
    updateTaskData({
      id: taskId,
      visionId: ''
    })
  }

  return <Button
    onClick={onRemove}
    leadingIcon={<HiOutlineXMark />}
    size='sm' className='group-hover:block hidden' />
}

export default memo(RemoveTaskFromGoal)
