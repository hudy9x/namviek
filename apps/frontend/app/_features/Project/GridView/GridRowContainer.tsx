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
      <div className='list-table-body'>
        <GridHeadingRow />
        {tasks.map(task => {
          return <GridContentRow task={task} key={task.id} />
        })}
      </div>
      <CreateNewRow />
      <GridLoadMore />
    </div>

  </div>
}
