'use client'

import { Loading } from '@shared/ui'
import { useReportContext } from './context'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'

export default function ReportWorkProgressChart() {
  const { tasks, loading } = useReportContext()
  const [series, setSeries] = useState([0, 100])

  useEffect(() => {
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
      <Loading.Absolute enabled={loading} border/>
      {typeof window !== 'undefined' && (
        <ReactApexChart
          type="pie"
          width={300}
          options={{
            labels: ['Done', 'Not done'],
            colors: ['#210F54', '#2C55FB'],
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
            }
          }}
          series={series}
        />
      )}
    </div>
  )
}
