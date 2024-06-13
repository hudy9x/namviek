import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface IReportProps {
  counter: number
  setCounter: Dispatch<SetStateAction<number>>
}

const ReportContext = createContext<IReportProps>({
  counter: 0,
  setCounter: () => console.log(1)
})

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [counter, setCounter] = useState(1)
  return <ReportContext.Provider value={{
    counter,
    setCounter
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
