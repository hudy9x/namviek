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

export default function ReportMemberProgressChart() {
  const { tasks, loading } = useReportContext()
  const [series, setSeries] = useState([0, 100])
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
      console.log(workByMembers)
      setWorkByMembers(workByMembers)
    }
  }, [tasks])

  return (
    <div className="relative w-[90%]">
      <AbsoluteLoading enabled={loading} />
      <div>
        {orgMembers.map(mem => {
          const data = workByMembers[mem.id]
          if (!data) return null
          const { done, notDone } = data
          const total = done + notDone

          const donePercent = (done / total) * 100
          const notDonePercent = (notDone / total) * 100

          return (
            <div key={mem.id} className="flex">
              <Avatar name={mem.name || ''} src={mem.photo || ''} />
              <div className="relative w-full flex items-center">
                <div
                  className="h-5"
                  title="Done"
                  style={{
                    width: `${donePercent}%`,
                    backgroundColor: '#210F54'
                  }}></div>
                <div
                  className="h-5"
                  title="Not done"
                  style={{
                    width: `${notDonePercent}%`,
                    backgroundColor: '#2C55FB'
                  }}></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
