import { IDBComponentConfig, dboardQuerySummary } from '@/services/dashboard'
import { useEffect, useState } from 'react'

interface IDbCompSummaryProps {
  title: string
  config: {
    [key: string]: unknown
  }
}

export default function DbCompSummary({ config, title }: IDbCompSummaryProps) {
  const [data, setData] = useState({
    loading: true,
    title: title,
    icon: config.icon as string,
    summary: 0,
    percent: 0,
    color: ''
  })

  useEffect(() => {
    dboardQuerySummary(config as IDBComponentConfig).then(res => {
      console.log(res.data)
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
      <h2 className="text-sm text-gray-600 ">{data.title}</h2>
      <div className="font-bold text-[40px] leading-none mt-1">
        {data.summary > 9 ? data.summary : `0${data.summary}`}
      </div>
    </div>
  )
}
