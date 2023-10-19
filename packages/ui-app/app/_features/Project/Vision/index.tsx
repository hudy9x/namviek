'use client'

import { useEffect, useState } from 'react'
import { VisionField, VisionProvider } from './context'
import { visionGetByProject } from '@/services/vision'
import { useParams } from 'next/navigation'
import ProjectVisionContainer from './VisionContainer'

export default function ProjectVision() {
  const { projectId } = useParams()
  const [loading, setLoading] = useState(true)
  const [visions, setVisions] = useState<VisionField[]>([])

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
        console.log(data)
        setVisions(data)
      })
      .catch(err => {
        clearLoading()
        console.log(err)
      })
  }, [projectId])

  return (
    <VisionProvider value={{ visions, loading, setLoading, setVisions }}>
      <ProjectVisionContainer />
    </VisionProvider>
  )
}
