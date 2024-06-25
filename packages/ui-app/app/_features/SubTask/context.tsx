import { Dispatch, SetStateAction, createContext } from 'react'
import { ReactNode, useState } from 'react'
import { Task } from '@prisma/client'

interface ITaskContext {
    isOpen: boolean,
    loading: boolean,
    subTasks: Task[],
    setLoading: Dispatch<SetStateAction<boolean>>,
    toggleOpen: () => void,
    setSubTasks: Dispatch<SetStateAction<Task[]>>
  }
  
  export const SubTaskContext = createContext<ITaskContext>({
    isOpen: false,
    loading: false,
    setLoading: () => {
      console.log('SUBTASK_LOADING')
    },
    toggleOpen: () => {
      console.log('TOGGLE_SUBTASK')
    },
    subTasks: [],
    setSubTasks: () => []
  })
  
  export const SubTaskProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [subTasks, setSubTasks] = useState<Task[]>([])
  
    const toggleOpen = () => {
      setIsOpen(!isOpen)
    }
  
    return (
      <SubTaskContext.Provider value={{ isOpen, toggleOpen, setLoading, loading, subTasks, setSubTasks }}>
        {children}
      </SubTaskContext.Provider>
    )
  }