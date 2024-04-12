import ChecklistAdd from "./ChecklistAdd";
import './style.css'
import ChecklistList from "./ChecklistList";

export default function TaskChecklist({ taskId }: { taskId: string }) {
  return <section className="task-checklist space-y-2 pb-3">
    <ChecklistList taskId={taskId} />
    <ChecklistAdd taskId={taskId} />
  </section>
}
