import { BoardContent } from './BoardContent/BoardContent'
import './style.css'
export const SIDEBAR_WIDTH = 308

export const Board = () => {
  return (
    <div
      className="h-full bg-white overflow-auto pt-4 px-9 flex whitespace-nowrap"
      style={{ width: `calc(100vw - ${SIDEBAR_WIDTH}px)` }}>
      <BoardContent />
    </div>
  )
}
