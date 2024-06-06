import './style.css'
import { ActivityContextProvider } from './context'
import ActivityContainer from './ActivityContainer'

export default function Activity({ taskId }: { taskId: string }) {

  return (
    <ActivityContextProvider>
      <ActivityContainer taskId={taskId || ''} />
    </ActivityContextProvider>
  )
}
