import { reportService } from '@/services/report'
import { useProjectStore } from '@/store/project'
import { Stats } from '@prisma/client'
import { Loading } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { HiOutlineX } from 'react-icons/hi'
import { useReportContext } from './context'

function RemoveProjectStats({ id }: { id: string }) {
  const { toggleProjectIds } = useReportContext()
  return <HiOutlineX className='absolute top-4 right-4 cursor-pointer w-7 h-7 text-gray-500 rounded-md border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 hover:bg-gray-200 p-2' onClick={() => {
    toggleProjectIds(id)
  }} />
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

export default function ReportByProjectItem({
  projectId,
  duration
}: {
  projectId: string
  duration: string
}) {
  const now = new Date()
  const [yAxis, setYAxis] = useState<number[]>([])
  const [xAxis, setXAxis] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    reportService.get({
      projectIds: [projectId],
      duration
    }).then(res => {
      const { data } = res.data
      const dailyData = data as Record<string, Stats[]>

      console.log(dailyData)
      if (!Object.keys(dailyData).length) {
        setXAxis([])
        setYAxis([])
        setLoading(false)
        return
      }

      // const days = xAxis;
      const totalData = new Map<number, number>()

      // for (let i = 0; i < days.length; i++) {
      //   totalData.set(days[i], 0)
      // }

      for (const pid in dailyData) {
        const dailyProjectDatas = dailyData[pid]

        if (!dailyProjectDatas || !dailyProjectDatas.length) continue

        for (let j = 0; j < dailyProjectDatas.length; j++) {
          const dailyItem = dailyProjectDatas[j];
          const dailyItemData = dailyItem.data as Record<string, unknown>
          const unDoneTotal = dailyItemData.unDoneTotal as number

          const key = dailyItem.date
          // console.log(dailyItem.date, unDoneTotal)

          const t = totalData.get(key) || 0
          totalData.set(key, t + unDoneTotal)
        }
      }

      const yAxis = Array.from(totalData, ([name, value]) => value);
      const xAxis = Array.from(totalData, ([name, value]) => name);

      setXAxis(xAxis)
      setYAxis(yAxis)
      setLoading(false)


    })

  }, [duration])

  const settings = {
    options: {
      annotations: {
        xaxis: [
          {
            x: now.getDate(),
            borderColor: 'red',
            label: {
              style: {
                color: '#c3c3c3',
              },
              // text: 'Today'
            }
          }
        ]
      },

      dataLabels: {
        enabled: true
      },


      grid: {
        borderColor: '#ebebeb',
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.1
        },
        column: {
          colors: ['transparent', 'transparent'],
        },
        xaxis: {
          lines: {
            show: true
          }
        }
      },

      title: {
        text: '',
        style: {
          fontWeight: 'normal'
        }
      },

      chart: {
        toolbar: {
          show: false
        },
        id: 'basic-bar',
        zoom: {
          enabled: false
        }
      },

      xaxis: {
        tickAmount: 17,
        // tickPlacement: 'between',
        categories: xAxis,
      },

      yaxis: {
        show: false
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
    ],
  }

  return <div className='report-project-stats box relative'>
    <ProjectInfo id={projectId} />
    <RemoveProjectStats id={projectId} />
    <Loading.Absolute enabled={loading} title='Fetching ...' />
    <Chart
      options={settings.options}
      series={settings.series}
      height={300}
      type="area"
    />

  </div>
}
