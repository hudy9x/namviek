import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


enum IReportTimeFilter {
  WEEK,
  MONTH
}
interface IReportProps {
  timeFilter: IReportTimeFilter
  setTimeFilter: Dispatch<SetStateAction<IReportTimeFilter>>
}

const ReportContext = createContext<IReportProps>({
  timeFilter: IReportTimeFilter.WEEK,
  setTimeFilter: () => console.log(1)
})

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [timeFilter, setTimeFilter] = useState<IReportTimeFilter>(IReportTimeFilter.WEEK)

  return <ReportContext.Provider value={{
    timeFilter,
    setTimeFilter,
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
  return context
}
