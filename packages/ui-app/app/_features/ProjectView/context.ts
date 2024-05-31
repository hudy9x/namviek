import { TaskPriority } from '@prisma/client'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { ETaskFilterGroupByType } from '../TaskFilter/context'

export interface IBoardFilter {
  date: string
  priority: TaskPriority | 'ALL',
  point: string
  groupBy: ETaskFilterGroupByType
  statusIds: string[]
}

interface IProjectViewContextProps {
  icon: string
  onlyMe: boolean
  setOnlyMe: Dispatch<SetStateAction<boolean>>
  isUpdate: boolean
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
  isUpdate: false,
  setIcon: () => { console.log(1) },
  onlyMe: false,
  setOnlyMe: () => { console.log(1) },
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
    point: "-1",
    statusIds: ['ALL'],
    groupBy: ETaskFilterGroupByType.STATUS
  },
  setFilter: () => { console.log(1) }
})

export const ProjectViewModalProvider = ProjectViewContext.Provider

export const useProjectViewContext = () => {
  const { filter, setFilter, customView,
    setCustomView, setName, name,
    icon, setIcon, onlyMe, setOnlyMe,
    visible, setVisible } = useContext(ProjectViewContext)

  const setFilterValue = (
    name: keyof IBoardFilter,
    val: string | string[] | ETaskFilterGroupByType | boolean
  ) => {
    setFilter(filter => ({ ...filter, [name]: val }))
  }

  return {
    icon, setIcon, onlyMe, setOnlyMe,
    filter, setFilter, setFilterValue,
    customView, setCustomView, setName,
    name, visible, setVisible
  }

}
