import { TaskPriority } from '@prisma/client'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { ETaskFilterGroupByType } from '../TaskFilter/context'

export interface IBoardFilter {
  date: string
  priority: TaskPriority | 'ALL',
  point: string
  groupBy: ETaskFilterGroupByType
}

interface IProjectViewContextProps {
  icon: string
  setIcon: Dispatch<SetStateAction<string>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  customView: boolean
  setCustomView: Dispatch<SetStateAction<boolean>>
  filter: IBoardFilter
  setFilter: Dispatch<SetStateAction<IBoardFilter>>
}
const ProjectViewContext = createContext<IProjectViewContextProps>({
  icon: '',
  setIcon: () => { console.log(1) },
  name: '',
  setName: () => {
    console.log(1)
  },
  visible: false,
  setVisible: () => {
    console.log(1)
  },
  customView: false,
  setCustomView: () => {
    console.log(1)
  },
  filter: {
    date: "this-month",
    priority: 'ALL',
    point: "INFINITE",
    groupBy: ETaskFilterGroupByType.STATUS
  },
  setFilter: () => { console.log(1) }
})

export const ProjectViewProvider = ProjectViewContext.Provider

export const useProjectViewContext = () => {
  const { filter, setFilter, customView,
    setCustomView, setName, name,
    icon, setIcon,
    visible, setVisible } = useContext(ProjectViewContext)

  const setFilterValue = (
    name: keyof IBoardFilter,
    val: string | ETaskFilterGroupByType
  ) => {
    setFilter(filter => ({ ...filter, [name]: val }))
  }

  return {
    icon, setIcon,
    filter, setFilter, setFilterValue,
    customView, setCustomView, setName,
    name, visible, setVisible
  }

}
