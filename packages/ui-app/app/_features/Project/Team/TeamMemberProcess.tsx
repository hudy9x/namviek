import { Task } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useProjectStatusStore } from '@/store/status'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const TeamMemberProcess = ({ datas }: { datas: Task[] }) => {
  const { statusDoneId } = useProjectStatusStore()

  let done = 0
  let notDone = 0
  let total = 0

  datas.forEach(dt => {
    total += 1
    if (dt.taskStatusId === statusDoneId) {
      done += 1
    } else {
      notDone += 1
    }
  })

  const percent = !total ? 0 : (done / total) * 100

  const options: ApexCharts.ApexOptions = useMemo(() => {
    return {
      chart: {
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%'
          },
          dataLabels: {
            value: {
              offsetY: -10,
              fontSize: '16px'
            }
          }
        }
      },

      colors: ['#4caf50'],
      labels: ['']
    }
  }, [])

  const startWZero = (n: number) => (n > 9 || n === 0 ? n + '' : `0${n}`)

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 gap-4 text-gray-400 dark:text-gray-500 text-sm">
          <div className="">
            <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              {startWZero(notDone)}
            </span>
            <div className="">Not done</div>
          </div>
          <div className="">
            <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              {startWZero(done)}
            </span>
            <div className=""> Done</div>
          </div>
        </div>

        <div className="team-insight-chart w-[90px] h-[80px] flex items-center justify-center grow-0 dark:text-gray-400">
          {typeof window !== 'undefined' && (
            <ApexCharts
              height={120}
              options={options}
              series={[percent]}
              type="radialBar"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamMemberProcess
