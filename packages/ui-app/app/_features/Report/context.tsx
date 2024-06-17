import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


enum IReportTimeFilter {
  WEEK,
  MONTH
}
interface IReportProps {
  timeFilter: IReportTimeFilter
  setTimeFilter: Dispatch<SetStateAction<IReportTimeFilter>>
  selectedProjectIds: string[]
  setProjectIds: Dispatch<SetStateAction<string[]>>
  selectedMemberIds: string[]
  setMemberIds: Dispatch<SetStateAction<string[]>>
}

const ReportContext = createContext<IReportProps>({
  timeFilter: IReportTimeFilter.WEEK,
  setTimeFilter: () => console.log(1),

  selectedMemberIds: [],
  setMemberIds: () => console.log(1),

  selectedProjectIds: [],
  setProjectIds: () => console.log(1)
})

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [timeFilter, setTimeFilter] = useState<IReportTimeFilter>(IReportTimeFilter.WEEK)
  const [projectIds, setProjectIds] = useState<string[]>([])
  const [selectedMemberIds, setMemberIds] = useState<string[]>([])

  return <ReportContext.Provider value={{
    timeFilter,
    setTimeFilter,
    selectedProjectIds: projectIds,
    setProjectIds,
    selectedMemberIds,
    setMemberIds
  }} >
    <div id='report-page'>
      <main>
        {children}
      </main>
    </div>
  </ReportContext.Provider>
}

// export const ReportProvider = ReportContext.Provider

export const useReportContext = () => {
  const context = useContext(ReportContext)
  const { setProjectIds, setMemberIds } = context

  const toggleProjectIds = (projectId: string) => {
    setProjectIds(oldProjectIds => {
      if (oldProjectIds.includes(projectId)) {
        return oldProjectIds.filter(oid => oid !== projectId)
      }

      return [...oldProjectIds, projectId]

    })
  }

  const toggleMemberIds = (memberId: string) => {
    setMemberIds(oldMemberIds => {
      if (oldMemberIds.includes(memberId)) {
        return oldMemberIds.filter(oid => oid !== memberId)
      }

      return [...oldMemberIds, memberId]

    })
  }
  return {
    ...context, ...{ toggleProjectIds, toggleMemberIds }
  }
}
