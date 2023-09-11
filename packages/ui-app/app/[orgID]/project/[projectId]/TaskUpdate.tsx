import { Modal } from "@shared/ui";
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react";

export const TaskUpdate = () => {
 const [visible, setVisible] = useState(false);
 const sp = useSearchParams()
 const { orgID, projectId } = useParams()
 const router = useRouter()
 const taskId = sp.get('taskId')

 const handleClose = () => {
  const mode = sp.get('mode')
  router.replace(`${orgID}/project/${projectId}?mode=${mode}`);
 }

 useEffect(() => {
  if (!taskId) return

  setVisible(true)
 }, [taskId])

 return (
  <div>
   <Modal
    visible={visible}
    onVisibleChange={setVisible}
    title="Add a new task"
    onClose={handleClose}
    content={
     <>
      <div>123123</div>
     </>
    }
   />
  </div>
 )
}
