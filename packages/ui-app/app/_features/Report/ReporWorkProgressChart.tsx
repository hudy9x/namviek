'use client'

import AbsoluteLoading from '@/components/AbsoluateLoading'
import { useReportContext } from './context'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'

export default function ReportWorkProgressChart() {
  const { tasks, loading } = useReportContext()
  const [series, setSeries] = useState([0, 100])

  useEffect(() => {
    console.log('update task', tasks)
    if (tasks.length) {
      let done = 0
      let notDone = 0

      tasks.forEach(t => {
        if (t.done) {
          done += 1
        } else {
          notDone += 1
        }
      })
      setSeries([done, notDone])
    }
  }, [tasks])

  return (
    <div className="relative">
      <AbsoluteLoading enabled={loading} />
      {typeof window !== 'undefined' && (
        <ReactApexChart
          type="pie"
          width={300}
          options={{
            labels: ['Done', 'Not done'],
            colors: ['#210F54', '#2C55FB'],
            legend: {
              show: false
            }
          }}
          series={series}
        />
      )}
    </div>
  )
}
