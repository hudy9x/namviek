import { Button } from "@shared/ui";
import { useReportContext } from "./context";

export default function ReportContent() {
  const { setCounter, counter } = useReportContext()
  return <section className='report-content'>
    <div className='report-time-filter'>
      <Button title="Click me" onClick={() => {
        setCounter(c => c + 1)
      }} />
    </div>
    <div className='report-project-content'>
      counter: {counter}
    </div>
    <div className='report-member-content'></div>
  </section>
}
