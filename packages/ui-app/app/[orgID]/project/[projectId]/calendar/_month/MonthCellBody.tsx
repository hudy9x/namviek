import MonthCellTask from './MonthCellTask'
import { PseudoTask } from './types'

export function MonthCellBody({
  dateTasks,
  date
}: {
  dateTasks: PseudoTask[]
  date: Date
}) {
  return (
    <div className="flex flex-col flex-1">
      {dateTasks?.length && date
        ? dateTasks.map((task, i) => (
            <MonthCellTask key={i} task={task} date={date} />
          ))
        : null}
    </div>
  )
}
