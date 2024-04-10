import { Form } from "@shared/ui";
import { useState } from "react";
import ChecklistAdd from "./ChecklistAdd";
import './style.css'

export default function TaskChecklist({ taskId }: { taskId: string }) {

  const [checklists, setChecklists] = useState([
    { id: '109823', order: 1, done: false, title: 'check list 1', doneAt: new Date() },
    { id: '109823', order: 2, done: false, title: 'check list 2', doneAt: new Date() },
  ])

  return <section className="task-checklist space-y-2 pb-3">
    {checklists.map((checklist) => {
      return <div key={checklist.id} className="checklist-item">
        <Form.Checkbox checked={checklist.done} className="shrink-0" />
        <input value={checklist.title} />
      </div>
    })}
    <ChecklistAdd taskId={taskId} />
  </section>
}
