import { visionGetByProject } from '@/services/vision'
import { Vision } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useVisionList = () => {
  const { projectId } = useParams()
  const [visions, setVisions] = useState<Vision[]>([])

  useEffect(() => {
    visionGetByProject(projectId)
      .then(res => {
        console.log('res', res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [projectId])
}
