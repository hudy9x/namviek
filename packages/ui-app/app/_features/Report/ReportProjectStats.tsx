import { statsService } from '@/services/stats'
import { Button } from '@shared/ui'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function ReportProjectStats() {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    statsService.get({
      orgId: '65d6ee7893180a33c22085de',
      projectIds: ['65e93b8c34df285397fd0b60'],
      month: 6,
      year: 2024,
    }).then(res => {
      const { data } = res.data
      console.log(data)
    })
  }, [counter])

  const settings = {
    options: {
      title: {
        text: 'Burndown chart',
        style: {
          fontWeight: 'normal'
        }
      },
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: 'Ideal',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: 'Actual',
        data: [10, 13, 40, 30, 49, 81, 60, 91]
      }
    ]
  }

  return <div className='report-project-stats'>
    <Button title='Update me' onClick={() => {
      setCounter(c => c + 1)
    }} />
    <Chart
      options={settings.options}
      series={settings.series}
      height={300}
      type="area"
    />

  </div>
}