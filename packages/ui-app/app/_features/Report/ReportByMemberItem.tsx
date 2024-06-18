
import { reportService } from '@/services/report'
import { useMemberStore } from '@/store/member'
import { useOrgMemberStore } from '@/store/orgMember'
import { getLastDateOfMonth } from '@shared/libs'
import { Avatar } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

const generateXAxis = (d: Date) => {

  const lastDate = getLastDateOfMonth(d)
  const arr = new Array(lastDate.getDate()).fill(1).map((v, i) => i + 1)

  return arr
}

function MemberInfo({ id }: { id: string }) {
  const { orgMembers: members } = useOrgMemberStore()
  const mInfo = useMemo(() => {
    return members.find(mem => mem.id === id)
  }, [id])

  if (!mInfo) return null

  return <div className='flex items-center gap-2 rounded-md'>
    <Avatar name={mInfo.name || ''} size='md' src={mInfo.photo || ''} />
    <h2>{mInfo.name}</h2>
  </div>
}

export default function ReportByMemberItem({ projectIds, memberId }: { projectIds: string[], memberId: string }) {
  const selectedDate = new Date()
  const xAxis = generateXAxis(selectedDate)
  const [yAxis, setYAxis] = useState<number[]>([])

  useEffect(() => {
    reportService.getMemberReport({
      projectIds,
      memberId,
      month: 6,
      year: 2024,
    }).then(res => {
      const { data } = res.data
      const dailyData = data as Record<string, number>

      if (!Object.keys(dailyData).length) return

      const days = xAxis;
      const totalData = new Map<number, number>()

      for (let i = 0; i < days.length; i++) {
        totalData.set(days[i], 0)
      }

      for (const pid in dailyData) {
        totalData.set(parseInt(pid), dailyData[pid])
      }

      const yAxis = Array.from(totalData, ([name, value]) => value);

      setYAxis(yAxis)


    })

  }, [projectIds, memberId])

  const settings = {
    options: {
      annotations: {
        xaxis: [
          {
            x: 18,
            x2: 20,
            borderColor: '#775DD0',
            label: {
              style: {
                color: '#c3c3c3',
              },
              // text: 'Today'
            }
          }
        ]
      },
      title: {
        text: '',
        style: {
          fontWeight: 'normal',
        }
      },
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        tickAmount: 12,
        labels: {
          rotate: 0,
        },
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
    <MemberInfo id={memberId} />
    <Chart
      options={settings.options}
      series={settings.series}
      height={300}
      type="area"
    />

  </div>
}
