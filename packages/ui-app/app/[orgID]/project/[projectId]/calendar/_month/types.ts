import { Task } from '@prisma/client'

export interface IMonthCell {
  date: Date
  tasks?: PseudoTask[]
  moreTaskShown: boolean
  toggleShowHideHandle: () => void
}
export interface PseudoTask extends Task {
  pseudoStartedDate: Date
  dueDate: Date
  previousIndexPerRow?: number
}

export interface DragTransferData {
  taskId: string
  fromDateString: string
}
