import { TaskFilterProvider } from '@/features/TaskFilter/context'
import ProjectContainer from '@/features/ProjectContainer'
import './style.css'

export default function Project() {
  return (
    <>
      <TaskFilterProvider>
        <ProjectContainer />
      </TaskFilterProvider>
    </>
  )
}
