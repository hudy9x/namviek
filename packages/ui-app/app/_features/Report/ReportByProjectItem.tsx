import { statsService } from '@/services/stats'
import { useProjectStore } from '@/store/project'
import { Stats } from '@prisma/client'
import { getLastDateOfMonth } from '@shared/libs'
import { Button } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

const generateXAxis = (d: Date) => {

  const lastDate = getLastDateOfMonth(d)
  const arr = new Array(lastDate.getDate()).fill(1).map((v, i) => i + 1)

  console.log(arr)

  return arr
}

function ProjectInfo({ id: projectId }: { id: string }) {
  const { projects } = useProjectStore()
  const pInfo = useMemo(() => {
    return projects.find(p => p.id === projectId)
  }, [projectId])

  if (!pInfo) return null

  return <div className='flex items-center gap-2 rounded-md'>
    <img src={pInfo.icon || ''} alt="Project icon" className='w-6 h-6' />
    <h2>{pInfo.name}</h2>
  </div>
}

export default function ReportByProjectItem({ projectId }: { projectId: string }) {
  const selectedDate = new Date()
  const xAxis = generateXAxis(selectedDate)
  const [yAxis, setYAxis] = useState<number[]>([])

  useEffect(() => {
    statsService.get({
      projectIds: [projectId],
      month: 6,
      year: 2024,
    }).then(res => {
      const { data } = res.data
      const dailyData = data as Record<string, Stats[]>

      if (!Object.keys(dailyData).length) return

      const days = xAxis;
      const totalData = new Map<number, number>()

      for (let i = 0; i < days.length; i++) {
        totalData.set(days[i], 0)
      }

      for (const pid in dailyData) {
        const dailyProjectDatas = dailyData[pid]

        if (!dailyProjectDatas || !dailyProjectDatas.length) continue

        for (let j = 0; j < dailyProjectDatas.length; j++) {
          const dailyItem = dailyProjectDatas[j];
          const dailyItemData = dailyItem.data as Record<string, unknown>
          const unDoneTotal = dailyItemData.unDoneTotal as number

          // console.log(dailyItem.date, unDoneTotal)

          const t = totalData.get(dailyItem.date) || 0
          totalData.set(dailyItem.date, t + unDoneTotal)
        }
      }

      const yAxis = Array.from(totalData, ([name, value]) => value);

      setYAxis(yAxis)


    })

  }, [])

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
        categories: xAxis
      }
    },
    series: [
      {
        name: 'Ideal',
        data: yAxis
      },
      // {
      //   name: 'Actual',
      //   data: [10, 13, 40, 30, 49, 81, 60, 91]
      // }
    ]
  }

  return <div className='report-project-stats box'>
    <ProjectInfo id={projectId} />
    <Chart
      options={settings.options}
      series={settings.series}
      height={300}
      type="area"
    />

  </div>
}
