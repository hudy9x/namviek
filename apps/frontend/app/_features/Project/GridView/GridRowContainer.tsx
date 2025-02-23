import './grid-style.css'
import CreateNewRow from "./CreateNewRow";
import GridHeadingRow from "./GridHeadingRow";
import GridContentRow from "./GridContentRow";
import GridLoadMore from "./GridLoadMore";
import { Grid } from "@prisma/client";


export default function GridRowContainer({ rows }: {
  rows: Grid[],
}) {
  return <div>
    <div className="list-table">
      <div className='list-table-body'>
        <GridHeadingRow />
        {rows.map(row => {
          return <GridContentRow row={row} key={row.id} />
        })}
      </div>
      <CreateNewRow />
      <GridLoadMore />
    </div>

  </div>
}
