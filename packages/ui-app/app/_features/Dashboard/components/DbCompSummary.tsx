import { IDBComponentConfig, dboardQuerySummary } from '@/services/dashboard'
import { useEffect, useState } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import DbCompDelete from './DbCompDelete'
import { refactorConfig } from '../type'

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
    <div className="py-4 px-5 w-[] border rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900 shadow-sm hover:shadow-lg hover:shadow-gray-200 transition-all relative overflow-hidden group cursor-pointer">
      <span className="absolute -bottom-10 right-4 text-[70px] opacity-30 group-hover:-bottom-6 transition-all group-hover:opacity-100">
        {data.icon}
      </span>
      <h2 className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 ">
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
