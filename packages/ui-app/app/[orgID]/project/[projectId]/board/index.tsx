import { BoardStatusAdd } from './BoardContent/BoardHeaderContent/BoardActionHeader/BoardStatusAdd'
import { BoardContainer } from './BoardContainer'
import { BoardContent } from './BoardContent/BoardContent'

export const Board = () => {
  return (
    <BoardContainer>
      <BoardContent/>
      <BoardStatusAdd />
    </BoardContainer>
  )
}
