'use client'

import AbsoluteLoading from '@/components/AbsoluateLoading'
import { useReportContext } from './context'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { useOrgMemberStore } from '@/store/orgMember'
import { Avatar } from '@shared/ui'

interface IWorkByMember {
  [key: string]: {
    done: number
    notDone: number
  }
}

interface IMemberChartItem {
  name: string
  photo: string
  data: {
    done: number
    notDone: number
  }
}

function MemberChartItem({ name, photo, data }: IMemberChartItem) {
  const { done, notDone } = data
  const total = done + notDone

  const donePercent = ((done / total) * 100).toFixed(2)
  const notDonePercent = ((notDone / total) * 100).toFixed(2)

  return (
    <div className="flex items-center gap-3">
      <Avatar size="md" name={name} src={photo} />
      <div className="relative w-full flex items-center">
        <div
          className="h-5 rounded-l-md text-white text-center text-xs leading-5"
          title="Done"
          style={{
            width: `${donePercent}%`,
            backgroundColor: '#210F54'
          }}>
          {donePercent} %
        </div>
        <div
          className="h-5 rounded-r-md text-white text-center text-xs leading-5"
          title="Not done"
          style={{
            width: `${notDonePercent}%`,
            backgroundColor: '#2C55FB'
          }}>
          {notDonePercent} %
        </div>
      </div>
      <div className="w-[48px] h-[20px] shrink-0 text-[10px] flex items-center justify-center border rounded-md bg-gray-100 px-1">
        {done}/{notDone}
      </div>
    </div>
  )
}

export default function ReportMemberProgressChart() {
  const { tasks, loading } = useReportContext()
  const { orgMembers } = useOrgMemberStore()
  const [workByMembers, setWorkByMembers] = useState<IWorkByMember>({})

  useEffect(() => {
    if (tasks.length) {
      const workByMembers: IWorkByMember = {}

      tasks.forEach(t => {
        const key = t.assigneeIds[0] || 'None'
        if (!workByMembers[key]) {
          workByMembers[key] = {
            done: 0,
            notDone: 0
          }
        }

        if (t.done) {
          workByMembers[key].done += 1
        } else {
          workByMembers[key].notDone += 1
        }
      })

      setWorkByMembers(workByMembers)
    }
  }, [tasks])

  const noneData = workByMembers['None'] || { done: 0, notDone: 0 }

  return (
    <div className="relative center-all w-full h-full">
      <AbsoluteLoading enabled={loading} />
      <div className="w-[90%] space-y-1">
        {orgMembers.map(mem => {
          const data = workByMembers[mem.id]
          if (!data) return null

          return (
            <MemberChartItem
              key={mem.id}
              name={mem.name || ''}
              photo={mem.photo || ''}
              data={data}
            />
          )
        })}

        <MemberChartItem name="None" photo="None" data={noneData} />
      </div>
    </div>
  )
}
