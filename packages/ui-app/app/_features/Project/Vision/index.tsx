'use client'

import { useState } from 'react'
import ProjectVisionList from './VisionList'
import { VisionField, VisionProvider } from './context'

export default function ProjectVision() {
  const [visions, setVisions] = useState<VisionField[]>([])

  return (
    <VisionProvider value={{ visions, setVisions }}>
      <ProjectVisionList />
    </VisionProvider>
  )
}
