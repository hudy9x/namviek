import AbsoluteLoading from '@/components/AbsoluateLoading'
import { useEffect, useState } from 'react'
import {
  TbSum,
  TbSquareRounded,
  TbInfoSquareRounded,
  TbSquareRoundedCheck
} from 'react-icons/tb'
import { useReportContext } from './context'

export default function ReportTotalTask() {
  const { tasks, loading } = useReportContext()
  const [metric, setMetric] = useState({
    done: 0,
    notDone: 0,
    total: 0
  })
  useEffect(() => {
    if (tasks.length) {
      let done = 0
      let notDone = 0
      let total = 0
      tasks.forEach(task => {
        if (task.done) {
          done += 1
        } else {
          notDone += 1
        }

        total += 1
      })

      setMetric({
        done,
        notDone,
        total
      })
    }
  }, [tasks])
  return (
    <>
      <div className="report-box relative p-4">
        <AbsoluteLoading enabled={loading} />
        <h2 className="text-sm text-gray-500">Number of complete tasks</h2>
        <span className="text-4xl font-bold">{metric.done}</span>
      </div>
      <div className="report-box relative p-4">
        <AbsoluteLoading enabled={loading} />
        <h2 className="text-sm text-gray-500">Number of incomplete tasks</h2>
        <span className="text-4xl font-bold">{metric.notDone}</span>
      </div>
      <div className="report-box relative p-4">
        <AbsoluteLoading enabled={loading} />
        <h2 className="text-sm text-gray-500">Total task</h2>
        <span className="text-4xl font-bold">{metric.total}</span>
      </div>
    </>
  )
}
