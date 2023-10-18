'use client'

import { useEffect, useState } from 'react'
import ProjectVisionList from './VisionList'
import { VisionField, VisionProvider } from './context'
import { visionGetByProject } from '@/services/vision'
import { useParams } from 'next/navigation'

export default function ProjectVision() {
  const { projectId } = useParams()
  const [visions, setVisions] = useState<VisionField[]>([])

  useEffect(() => {
    visionGetByProject(projectId)
      .then(res => {
        const { data } = res.data
        console.log(data)
        setVisions(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [projectId])

  return (
    <VisionProvider value={{ visions, setVisions }}>
      <ProjectVisionList />
    </VisionProvider>
  )
}
