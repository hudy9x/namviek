import './grid-style.css'
import CreateNewRow from "./CreateNewRow";
import GridHeadingRow from "./GridHeadingRow";
import GridContentRow from "./GridContentRow";
import GridLoadMore from "./GridLoadMore";
import { Grid } from "@prisma/client";


export default function GridRowContainer({ tasks }: {
  tasks: Grid[],
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
