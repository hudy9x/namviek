import { Modal } from "@shared/ui";
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { TaskUpdateForm } from "./TaskUpdateForm";

export const TaskUpdate = () => {
 const [visible, setVisible] = useState(false);
 const sp = useSearchParams()
 const { orgID, projectId } = useParams()
 const router = useRouter()
 const taskId = sp.get('taskId')
 
 useEffect(() => {
  if (!taskId) return
  
  setVisible(true)
 }, [taskId])

 useEffect(() => {
  if (visible) return
  
  const mode = sp.get('mode')
  router.replace(`${orgID}/project/${projectId}?mode=${mode}`);
 }, [visible])

 return (
  <div>
   <Modal
    visible={visible}
    onVisibleChange={setVisible}
    title="Update a new task"
    content={
     <>
      <TaskUpdateForm
       taskId={taskId || ''}
       onSuccess={() => {
        setVisible(false);
       }}
      />
     </>
    }
   />
  </div>
 )
}
