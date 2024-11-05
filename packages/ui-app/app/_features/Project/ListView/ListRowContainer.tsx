import { ExtendedTask } from "@/store/task";
import './list-container.css'
import ListHeadingRow from "./ListHeadingRow";
import ListContentRow from "./ListContentRow";
import useTaskFilterContext from "@/features/TaskFilter/useTaskFilterContext";
import { ITaskFilterGroupbyItem } from "@/features/TaskFilter/context";

export default function ListRowContainer({ tasks, group }: { tasks: ExtendedTask[], group: ITaskFilterGroupbyItem }) {
  const {
    // groupByLoading,
    // groupByItems,
    // filter,
    isGroupbyPriority,
    isGroupbyAssignee,
    isGroupbyStatus
  } = useTaskFilterContext()

  return <div>
    <div className="list-table">
      <ListHeadingRow />
      {tasks.map(task => {
        if (isGroupbyStatus && task.taskStatusId !== group.id) {
          if (group.id === 'NONE' && group.items.includes(task.id)) {
            return <ListContentRow key={task.id} task={task} />
          }
          return null
        }

        if (isGroupbyAssignee) {
          if (
            task.assigneeIds.length &&
            !task.assigneeIds.includes(group.id)
          ) {
            return null
          }

          if (!task.assigneeIds.length && group.id !== 'NONE') {
            return null
          }
        }

        if (isGroupbyPriority && task.priority !== group.id) {
          return null
        }

        return <ListContentRow task={task} key={task.id} />
      })}
    </div>

  </div>
}
