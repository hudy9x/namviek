import { DatePicker, Form } from "@shared/ui";
import { useState } from "react";


export default function TaskChecklist({ taskId }: { taskId: string }) {
  const [checklists, setChecklists] = useState([
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
    { id: '109823', title: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.', dueDate: new Date() },
  ])

  return <section className="task-checklist">
    {checklists.map(checklist => {
      return <div className="flex items-center gap-2">
        <Form.Checkbox />
        <input className="text-sm" value={checklist.title} />

        <DatePicker
          value={checklist.dueDate}
          enableTimer={true}
        />
      </div>
    })}
  </section>
}
