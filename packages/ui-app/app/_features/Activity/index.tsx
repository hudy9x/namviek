import './style.css'
import { ActivityContextProvider } from './context'
import ActivityContainer from './ActivityContainer'
import { useSearchParams } from 'next/navigation'

export default function Activity() {
  const sp = useSearchParams()
  const taskId = sp.get('taskId')

  // if (!taskId) return null

  return (
    <ActivityContextProvider>
      <ActivityContainer taskId={taskId || ''} />
    </ActivityContextProvider>
  )
}
