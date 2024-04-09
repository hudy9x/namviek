import { Form } from "@shared/ui";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import './style.css'

export default function TaskChecklist({ taskId }: { taskId: string }) {
  const [checklists, setChecklists] = useState([
    { id: '109823', order: 1, checked: false, title: 'check list 1', dueDate: new Date() },
    { id: '109823', order: 2, checked: false, title: 'check list 2', dueDate: new Date() },
    { id: '109823', order: 3, checked: false, title: 'check list 3', dueDate: new Date() },
    { id: '109823', order: 4, checked: false, title: 'check list 4', dueDate: new Date() },
    { id: '109823', order: 5, checked: false, title: 'this is a long long long check list', dueDate: new Date() },
    { id: '109823', order: 6, checked: false, title: 'and this is a very very very long long long check list item', dueDate: new Date() },
    { id: '109823', order: 7, checked: false, title: 'this is the last check list ', dueDate: new Date() },
  ])

  return <section className="task-checklist space-y-2 pb-3">
    {checklists.sort.map(checklist => {
      return <div key={checklist.id} className="checklist-item">
        <Form.Checkbox checked={checklist.checked} className="shrink-0" />
        <input value={checklist.title} />

        {/* <DatePicker */}
        {/*   value={checklist.dueDate} */}
        {/*   enableTimer={true} */}
        {/* /> */}
      </div>
    })}
    <div className="checklist-item">
      <HiOutlinePlus />
      <input placeholder="Add a checklist" />
    </div>
  </section>
}
