import Chart from 'react-apexcharts'
import { useEffect } from 'react'

export default function OverviewBurnoutChart() {
  const settings = {
    options: {
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

  return (
    <div className="mt-3 bg-white border rounded-md shadow-sm pt-3 ">
      <Chart
        options={settings.options}
        series={settings.series}
        height={300}
        type="line"
      />
    </div>
  )
}
