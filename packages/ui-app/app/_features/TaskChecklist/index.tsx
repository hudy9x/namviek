import ChecklistAdd from "./ChecklistAdd";
import './style.css'
import ChecklistList from "./ChecklistList";
import { TaskChecklist as CheckList } from "@prisma/client";
import { useState } from "react";

export default function TaskChecklist({ taskId, parentTaskId }: { taskId: string, parentTaskId?: string | null }) {
  const [subTaskCheckList, setListSubTaskCheckList] = useState<CheckList[]>([])

  return <section className="task-checklist space-y-2 pb-3">
    <ChecklistList taskId={taskId} parentTaskId={parentTaskId} subTaskCheckList={subTaskCheckList} setListSubTaskCheckList={setListSubTaskCheckList}/>
    <ChecklistAdd taskId={taskId} parentTaskId={parentTaskId} setListSubTaskCheckList={setListSubTaskCheckList}/>
  </section>
}
