import { TaskFilterProvider } from '@/features/TaskFilter/context'
import ProjectContainer from '@/features/ProjectContainer'
import './style.css'

export const revalidate = 1800 // 30 minutes
export default function Project() {
  return (
    <>
      <TaskFilterProvider>
        <ProjectContainer />
      </TaskFilterProvider>
    </>
  )
}
