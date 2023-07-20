

import { BoardTask } from "./BoardTask"
import { StatusAction } from "./status/action";
import { StatusAdd } from "./status/action/StatusAdd";
import { StatusCollapse } from "./status/action/StatusCollapse";
import { StatusContainer } from "./status/StatusContainer";
import { StatusList } from "./status/StatusList";
import { TaskAdd } from "./task/TaskAdd";

export const SIDEBAR_WIDTH = 308;

export const Board = () => {
  return (
    <div className="h-full overflow-auto pt-4 pl-9" style={{ width: `calc(100vw - ${SIDEBAR_WIDTH}px)` }}>
      <StatusContainer>
        <StatusList>
          {(status) => (
            <div className="w-64 flex justify-between">
              <div className="text-xs font-semibold flex items-center">
                <span>{status.name}</span>
              </div>
              <StatusAction>
                <StatusCollapse/>
                <TaskAdd/>
              </StatusAction>
            </div>
          )}
        </StatusList>
        <StatusAdd/>
      </StatusContainer>
      <BoardTask/>
    </div>
  )
}
