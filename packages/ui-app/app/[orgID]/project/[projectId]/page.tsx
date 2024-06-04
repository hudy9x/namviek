import { TaskFilterProvider } from '@/features/TaskFilter/context'
import ProjectContainer from '@/features/ProjectContainer'
import './style.css'

export const revalidate = 120 // 2 minutes
export default function Project() {
  return (
    <>
      <TaskFilterProvider>
        <ProjectContainer />
      </TaskFilterProvider>
    </>
  )
}
