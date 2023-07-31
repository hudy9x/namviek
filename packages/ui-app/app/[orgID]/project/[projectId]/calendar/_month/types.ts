import { Task } from '@prisma/client'

export interface IDateProps {
  date: Date
  tasks?: PseudoDateTask[]
}
export interface PseudoDateTask extends Task {
  pseudoStartedDate: Date
  dueDate: Date
}

export interface DragTransferData {
  taskId: string
  fromDateString: string
}
