'use client'

import { useEffect, useState } from 'react'
import { VisionField, VisionProvider } from './context'
import { visionGetByProject } from '@/services/vision'
import { useParams } from 'next/navigation'
import ProjectVisionContainer from './VisionContainer'
import './style.css'
import { Vision } from '@prisma/client'
import { useTaskStore } from '@/store/task'
import { useProjectStatusStore } from '@/store/status'

const useVisionProgress = ({ visions }: { visions: VisionField[] }) => {
  const { tasks } = useTaskStore()
  const { statusDoneId } = useProjectStatusStore()
  //
  const visionProgress: { [key: string]: { total: number; done: number } } = {}

  let taskTotal = 0
  let taskDone = 0

  visions.forEach(v => {
    visionProgress[v.id] = { total: 0, done: 0 }
  })

  tasks.forEach(task => {
    const { visionId, done, taskStatusId } = task
    if (!visionId || !visionProgress[visionId]) return

    taskTotal += 1
    visionProgress[visionId].total += 1

    if (taskStatusId === statusDoneId) {
      visionProgress[visionId].done += 1
      taskDone += 1
    }
  })

  return {
    taskDone,
    taskTotal,
    visionProgress
  }
}

export default function ProjectVision() {
  const { projectId } = useParams()
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const [visions, setVisions] = useState<VisionField[]>([])

  const { visionProgress, taskDone, taskTotal } = useVisionProgress({ visions })

  const clearLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  useEffect(() => {
    setLoading(true)
    visionGetByProject(projectId)
      .then(res => {
        clearLoading()
        const { data } = res.data
        const visionData = data as Vision[]

        setVisions(
          visionData.map(v => {
            const { id, name, projectId, organizationId, dueDate, progress } = v
            return {
              id,
              projectId,
              name,
              organizationId,
              progress,
              dueDate: dueDate ? new Date(dueDate) : null
            } as VisionField
          })
        )
      })
      .catch(err => {
        clearLoading()
        console.log(err)
      })
  }, [projectId])

  return (
    <VisionProvider
      value={{
        taskDone,
        taskTotal,
        visions,
        loading,
        visionProgress,
        setLoading,
        setVisions,
        selected,
        setSelected
      }}>
      <ProjectVisionContainer />
    </VisionProvider>
  )
}
