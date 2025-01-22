import { memo } from "react";
import { Button } from '@ui-components'
import { HiOutlineXMark } from 'react-icons/hi2'
import { useServiceTaskUpdate } from "@/hooks/useServiceTaskUpdate";

function RemoveTaskFromGoal({ taskId, className }: { taskId: string, className?: string }) {
  const { updateTaskData } = useServiceTaskUpdate()
  const onRemove = () => {
    updateTaskData({
      id: taskId,
      visionId: ''
    })
  }

  return <Button
    onClick={onRemove}
    leadingIcon={<HiOutlineXMark />}
    size='sm' className={className} />
}

export default memo(RemoveTaskFromGoal)
