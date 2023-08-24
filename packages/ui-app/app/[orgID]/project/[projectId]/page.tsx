import { TaskFilterProvider } from '@/features/TaskFilter/context'
import ProjectContainer from './ProjectContainer'
import './style.css'

export default function Project({ params }: { params: { projectId: string } }) {
  console.log('params', params.projectId)
  return (
    <>
      <TaskFilterProvider>
        <ProjectContainer />
      </TaskFilterProvider>
    </>
  )
}
