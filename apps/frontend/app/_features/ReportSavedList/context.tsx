import localforage from "localforage"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { IReportTimeFilter } from "../Report/context"

export interface ISavedItem {
  title: string
  id: string
  createdAt: Date
  data: {
    timeFilter: IReportTimeFilter,
    selectedMemberIds: string[],
    selectedProjectIds: string[],
    selectedMonth: string,
    duration: string,
  }
}
interface IContext {
  list: ISavedItem[]
  setList: Dispatch<SetStateAction<ISavedItem[]>>
}

export const reportStore = localforage.createInstance({
  name: 'ReportStore'
})

const ReportSavedListContext = createContext<IContext>({
  list: [],
  setList: () => console.log(1)
})
export const ReportSavedListProvider = function({ children }: { children: ReactNode }) {
  const [list, setList] = useState<ISavedItem[]>([])

  useEffect(() => {
    console.log('get data from store')
    reportStore.keys().then(async keys => {
      if (!keys || !keys.length) {
        setList([])
        return
      }

      const datas: ISavedItem[] = []
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const item = await reportStore.getItem(key)
        if (!item) return

        console.log('item', item)
        datas.push(item as ISavedItem)
      }

      setList(datas)

      console.log('saved list', datas)
    })
  }, [])

  return <ReportSavedListContext.Provider value={{ list, setList }}>
    {children}
  </ReportSavedListContext.Provider>
}

export const useReportSavedListContext = () => {
  const context = useContext(ReportSavedListContext)
  const { setList } = context
  const addItem = (item: ISavedItem) => {
    reportStore.setItem(item.id, item)
    setList(list => [item, ...list])
  }

  const delItem = (id: string) => {
    reportStore.removeItem(id)
    setList(list => list.filter(l => l.id !== id))
  }

  return { ...context, addItem, delItem }
}
