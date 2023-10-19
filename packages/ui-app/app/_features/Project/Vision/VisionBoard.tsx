import { useTaskStore } from '@/store/task'
import { useVisionContext } from './context'

export default function VisionBoard() {
  const { tasks } = useTaskStore()
  const { visions } = useVisionContext()
  return <div></div>
}
