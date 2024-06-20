
import { reportService } from '@/services/report'
import { useOrgMemberStore } from '@/store/orgMember'
import { Avatar, Loading } from '@shared/ui'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

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

export default function ReportByMemberItem({
  projectIds,
  memberId,
  duration
}:
  {
    projectIds: string[],
    memberId: string,
    duration: string
  }) {
  const now = new Date()

  const [yAxis, setYAxis] = useState<number[]>([])
  const [xAxis, setXAxis] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    reportService.getMemberReport({
      projectIds,
      memberId,
      duration
    }).then(res => {
      const { data } = res.data
      const dailyData = data as Record<string, number>

      if (!Object.keys(dailyData).length) {
        setXAxis([])
        setYAxis([])
        setLoading(false)
        return
      }

      const totalData = new Map<number, number>()

      for (const pid in dailyData) {
        totalData.set(parseInt(pid), dailyData[pid])
      }

      const yAxis = Array.from(totalData, ([name, value]) => value);
      const xAxis = Array.from(totalData, ([name, value]) => name);

      setYAxis(yAxis)
      setXAxis(xAxis)
      setLoading(false)

    })

  }, [projectIds, memberId, duration])

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
      title: {
        text: '',
        style: {
          fontWeight: 'normal',
        }
      },
      chart: {
        toolbar: {
          show: false
        },
        id: 'member-chart',
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tickAmount: 17,
        // tickPlacement: 'between',
        labels: {
          rotate: 0,
        },
        categories: xAxis
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
    ]
  }

  return <div className='report-project-stats box relative'>
    <MemberInfo id={memberId} />
    <Loading.Absolute enabled={loading} title='Fetching ...' />
    <Chart
      options={settings.options}
      series={settings.series}
      height={190}
      type="area"
    />

  </div>
}
