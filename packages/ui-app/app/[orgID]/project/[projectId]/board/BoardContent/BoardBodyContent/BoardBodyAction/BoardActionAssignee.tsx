import TaskAssignee from "../../../../views/TaskAssignee"

export const BoardActionAssignee = ({
 taskId,
 uids,
}: {
 taskId: string,
 uids: string[]
}) => {
  return (
   <TaskAssignee
     taskId={taskId}
     uids={uids}
   />
  )
}
