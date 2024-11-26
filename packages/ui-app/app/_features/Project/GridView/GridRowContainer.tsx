import { ExtendedTask } from "@/store/task";
import './grid-style.css'
import CreateNewRow from "./CreateNewRow";
import GridHeadingRow from "./GridHeadingRow";
import GridContentRow from "./GridContentRow";
import GridLoadMore from "./GridLoadMore";


export default function GridRowContainer({ tasks }: {
  tasks: ExtendedTask[],
}) {

  return <div>
    <div className="list-table">
      <GridHeadingRow />
      {tasks.map(task => {
        return <GridContentRow task={task} key={task.id} />
      })}
      <CreateNewRow />
      <GridLoadMore />
    </div>

  </div>
}
