import { visionAdd, visionDelete, visionUpdate } from '@/services/vision'
import { Vision } from '@prisma/client'
import { messageError, messageSuccess, randomId } from '@shared/ui'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export type VisionField = Omit<Vision, 'createdAt' | 'createdBy'>
interface IVisionContextProps {
  selected: string
  taskDone: number
  taskTotal: number
  visionProgress: { [key: string]: { total: number; done: number } }
  setSelected: Dispatch<SetStateAction<string>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  visions: VisionField[]
  setVisions: Dispatch<SetStateAction<VisionField[]>>
}
const VisionContext = createContext<IVisionContextProps>({
  loading: false,
  visions: [],
  taskDone: 0,
  taskTotal: 0,
  visionProgress: {},
  selected: '',
  setSelected: () => {
    console.log(3)
  },
  setLoading: () => {
    console.log(2)
  },
  setVisions: () => {
    console.log(1)
  }
})

export const VisionProvider = VisionContext.Provider

export const useVisionContext = () => {
  const {
    visions,
    taskDone,
    taskTotal,
    visionProgress,
    setVisions,
    loading,
    setLoading,
    selected,
    setSelected
  } = useContext(VisionContext)

  const convertToProgress = (done: number, total: number) => {
    const progress = parseFloat(((done / total) * 100).toFixed(1))
    return progress
  }

  const getVisionProgress = (id: string) => {
    const progress = visionProgress[id]
    if (!progress) {
      return 0
    }

    return convertToProgress(progress.done, progress.total)
  }

  const deleteVision = (id: string) => {
    setVisions(prev => prev.filter(v => v.id !== id))
    visionDelete(id)
      .then(res => {
        messageSuccess('done')
      })
      .catch(err => {
        messageError('delete vision error ')
      })
  }

  const updateVision = (data: Partial<VisionField>) => {
    setVisions(prev =>
      prev.map(v => {
        if (v.id === data.id) {
          return { ...v, ...data }
        }
        return v
      })
    )

    visionUpdate(data)
      .then(res => {
        messageSuccess('done')
      })
      .catch(err => {
        messageError('delete vision error ')
      })
  }

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

  return {
    visions,
    taskDone,
    taskTotal,
    visionProgress,
    setVisions,
    createNewVision,
    updateVision,
    deleteVision,
    loading,
    setLoading,
    selected,
    setSelected,
    getVisionProgress
  }
}
