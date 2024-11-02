import { ExtendedTask } from "@/store/task";
import './list-container.css'
import ListHeadingRow from "./ListHeadingRow";
import ListContentRow from "./ListContentRow";

export default function ListRowContainer({ tasks }: { tasks: ExtendedTask[] }) {

  return <div>
    <div className="list-table">
      <ListHeadingRow />
      {tasks.map(task => {
        return <ListContentRow task={task} key={task.id} />
      })}
    </div>

  </div>
}
