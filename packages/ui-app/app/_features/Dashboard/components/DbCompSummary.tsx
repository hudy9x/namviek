import { IDBComponentConfig, dboardQuerySummary } from '@/services/dashboard'
import { useEffect, useState } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import DbCompDelete from './DbCompDelete'
import { addDays, lastDayOfMonth, subDays } from 'date-fns'

type DateOperation = '>' | '>=' | '=' | '<' | '<='
type DateString = 'today' | 'week' | 'month'
type DateWithOperation = [DateOperation, DateString]

interface ICompConfig {
  date?: DateWithOperation
  [key: string]: unknown
}

interface IDbCompSummaryProps {
  id: string
  title: string
  config: ICompConfig
}

const getMondayNSaturdayInWeek = (d: Date) => {
  const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay())
  const sat = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + (5 - d.getDay() + 1)
  )

  return [mon, sat]
}

const getStartNEndDateOfMonth = (d: Date) => {
  return [new Date(d.getFullYear(), d.getMonth(), 1), lastDayOfMonth(d)]
}

const to23h59m = (d: Date) => {
  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(0)
}

export default function DbCompSummary({
  id,
  config,
  title
}: IDbCompSummaryProps) {
  const [data, setData] = useState({
    loading: true,
    title: title,
    icon: config.icon as string,
    summary: 0,
    percent: 0,
    color: ''
  })

  const refactorConfig = (config: ICompConfig) => {
    if (config.date) {
      const [operator, dateStr] = config.date
      const today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)

      if (dateStr === 'today') {
        if (operator === '=') {
          config.startDate = today
          config.endDate = today
        }

        if (operator === '<') {
          // must -- date cuz the query on server side is <=
          const yesterday = subDays(today, 1)
          config.startDate = null
          config.endDate = yesterday
        }

        if (operator === '>') {
          // must +1 date cuz the query on server side is >=
          to23h59m(today)
          config.startDate = today
          config.endDate = null
        }
      }

      if (dateStr === 'week') {
        const [mon, sat] = getMondayNSaturdayInWeek(new Date())

        if (operator === '=') {
          config.startDate = mon
          config.endDate = sat
        }

        if (operator === '>') {
          to23h59m(sat)
          config.startDate = sat
          config.endDate = null
        }

        if (operator === '<') {
          // must -- date cuz the query on server side is <=
          const sun = subDays(mon, 1)
          config.startDate = null
          config.endDate = sun
        }
      }

      if (dateStr === 'month') {
        const [firstDate, lastDate] = getStartNEndDateOfMonth(new Date())

        if (operator === '=') {
          config.startDate = firstDate
          config.endDate = lastDate
        }

        if (operator === '>') {
          to23h59m(lastDate)
          config.startDate = lastDate
          config.endDate = null
        }

        if (operator === '<') {
          const prevMonth = subDays(firstDate, 1)
          config.startDate = null
          config.endDate = prevMonth
        }
      }

      delete config.date
    }
    return config
  }

  useEffect(() => {
    const newConfig = refactorConfig(config)
    dboardQuerySummary(newConfig as IDBComponentConfig).then(res => {
      // console.log(res.data)
      const { status, data } = res.data
      if (status !== 200) {
        return
      }

      setData(prev => {
        return { ...prev, summary: data }
      })
    })
  }, [])

  return (
    <div className="py-4 px-5 w-[] border rounded-md bg-white shadow-sm hover:shadow-lg hover:shadow-gray-200 transition-all relative overflow-hidden group cursor-pointer">
      <span className="absolute -bottom-10 right-4 text-[70px] opacity-30 group-hover:-bottom-6 transition-all group-hover:opacity-100">
        {data.icon}
      </span>
      <h2 className="text-sm text-gray-600 flex items-center gap-1 ">
        {config.fixed ? <AiOutlineLock /> : null}
        {data.title}
      </h2>
      <div className="font-bold text-[40px] leading-none mt-1">
        {data.summary > 9 ? data.summary : `0${data.summary}`}
      </div>
      <DbCompDelete id={id} />
    </div>
  )
}
