import { Task } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { TStatusTask } from './TeamMember'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const TeamMemberProcess = ({
  statusTasks,
  tasks
}: {
  statusTasks: TStatusTask[]
  tasks: Task[]
}) => {
  const doneTasks = statusTasks.find(item => item.type === 'DONE')?.tasks || []

  const series = useMemo(() => {
    if (!tasks.length || !doneTasks.length) return [0]
    return [(doneTasks.length / tasks.length) * 100]
  }, [statusTasks])

  const options: ApexCharts.ApexOptions = useMemo(() => {
    return {
      chart: {
        height: 120,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%'
          }
        }
      },
      colors: ['#4caf50'],
      labels: ['Done']
    }
  }, [statusTasks])

  return (
    <div className="">
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-col">
          <span>{tasks.length - doneTasks.length}</span>
          <span className="text-gray-400">Not done</span>
        </div>
        <div className="flex flex-col">
          <span>{doneTasks.length}</span>
          <span className="text-gray-400"> Done</span>
        </div>
        <div className="">
          <ApexCharts
            options={options}
            series={series}
            type="radialBar"
            height={120}
          />
        </div>
      </div>
      <TeamMemberLineStatus statusTasks={statusTasks} tasks={tasks} />
    </div>
  )
}

const TeamMemberLineStatus = ({
  statusTasks,
  tasks
}: {
  statusTasks: TStatusTask[]
  tasks: Task[]
}) => {
  const statusTaskExcludeDone = statusTasks.filter(item => item.type !== 'DONE')

  return (
    <div className="flex rounded w-full h-2 overflow-hidden bg-gray-300 mt-4">
      {statusTaskExcludeDone.map(item => (
        <span
          style={{
            backgroundColor: item.color,
            width: `${(item.tasks.length / tasks.length) * 100}%`
          }}
          key={item.id}
          className="h-full"></span>
      ))}
    </div>
  )
}

export default TeamMemberProcess
