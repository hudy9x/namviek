import { DragDropContext } from 'react-beautiful-dnd'
import { useBoardAction } from './useBoardAction'
import { BoardColumnList } from './BoardColumnList'
import './style.css'
export const SIDEBAR_WIDTH = 308

export const Board = () => {
  const { onDragEnd } = useBoardAction()
  return (
    <div
      className="board-wrapper"
      style={{ width: `calc(100vw - ${SIDEBAR_WIDTH}px)` }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardColumnList />
      </DragDropContext>
    </div>
  )
}
