import { visionAdd, visionDelete, visionUpdate } from '@/services/vision'
import { Vision } from '@prisma/client'
import { messageError, messageSuccess, randomId } from '@shared/ui'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export type VisionField = Omit<Vision, 'createdAt' | 'createdBy'>

export type VisionByDays = { [key: string]: VisionField[] }

export type IVisionFilter = {
  month: number
}

export enum EVisionViewMode {
  TIMELINE = 'TIMELINE',
  CALENDAR = 'CALENDAR'
}

interface IVisionContextProps {
  mode: EVisionViewMode
  setMode: Dispatch<SetStateAction<EVisionViewMode>>
  selected: string
  taskDone: number
  taskTotal: number
  visionByDays: VisionByDays
  visionProgress: {
    [key: string]: {
      total: number
      done: number
      assigneeIds: string[]
    }
  }
  filter: IVisionFilter
  setFilter: Dispatch<SetStateAction<IVisionFilter>>
  setSelected: Dispatch<SetStateAction<string>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  visions: VisionField[]
  setVisions: Dispatch<SetStateAction<VisionField[]>>
}
const VisionContext = createContext<IVisionContextProps>({
  mode: EVisionViewMode.CALENDAR,
  setMode: () => {
    console.log(5)
  },
  loading: false,
  filter: {
    month: new Date().getMonth() + 1
  },
  setFilter: () => {
    console.log(4)
  },
  visions: [],
  taskDone: 0,
  taskTotal: 0,
  visionProgress: {},
  visionByDays: {},
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
    visionByDays,
    visionProgress,
    setVisions,
    filter,
    setFilter,
    mode,
    setMode,
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

  const getVisionData = (id: string) => {
    return visionProgress[id]
  }

  const getVisionByDay = (key: string) => {
    return visionByDays[key] || []
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
      dueDate: data.dueDate || new Date(),
      startDate: data.startDate || new Date(),
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
    getVisionByDay,
    setVisions,
    createNewVision,
    updateVision,
    deleteVision,
    loading,
    setLoading,
    selected,
    filter,
    setFilter,
    mode,
    setMode,
    setSelected,
    getVisionProgress,
    getVisionData
  }
}
