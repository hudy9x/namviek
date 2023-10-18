import { visionAdd } from '@/services/vision'
import { Vision } from '@prisma/client'
import { randomId } from '@shared/ui'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export type VisionField = Omit<Vision, 'createdAt' | 'createdBy'>

interface IVisionContextProps {
  visions: VisionField[]
  setVisions: Dispatch<SetStateAction<VisionField[]>>
}
const VisionContext = createContext<IVisionContextProps>({
  visions: [],
  setVisions: () => {
    console.log(1)
  }
})

export const VisionProvider = VisionContext.Provider

export const useVisionContext = () => {
  const { visions, setVisions } = useContext(VisionContext)
  const createNewVision = (data: Partial<VisionField>) => {
    const visionId = `VISION_RAND_${randomId()}`

    const newData = {
      name: data.name || '',
      dueDate: new Date(),
      parentId: null,
      progress: 0,
      projectId: data.projectId || '',
      organizationId: data.organizationId || ''
    }

    setVisions(prev => [...prev, { ...{ id: visionId }, ...newData }])

    visionAdd(newData).then(res => {
      const { data } = res.data

      setVisions(prev => {
        return prev.map(v => {
          if (v.id === visionId) {
            v.id = data.id
          }
          return v
        })
      })
    })
  }

  return { visions, setVisions, createNewVision }
}
