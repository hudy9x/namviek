import MonthTask from './MonthTask'
import { PseudoDateTask } from './types'

export function MonthCellBody({
  dateTasks,
  date
}: {
  dateTasks: PseudoDateTask[]
  date: Date
}) {
  return (
    <div className="flex flex-col flex-1">
      {dateTasks?.length && date
        ? dateTasks.map((task, i) => (
            <MonthTask key={i} task={task} date={date} />
          ))
        : null}
    </div>
  )
}
