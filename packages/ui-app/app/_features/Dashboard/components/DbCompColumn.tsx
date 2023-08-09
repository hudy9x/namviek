import { IDBComponentConfig, dboardQueryColumn } from '@/services/dashboard'
import { useEffect, useState } from 'react'
import { AiOutlineLock, AiOutlineSync } from 'react-icons/ai'
import { IDbCompProps, refactorConfig } from '../type'
import { Button } from '@shared/ui'
import { useProjectStatusStore } from '@/store/status'
import ChartColumn, { ISerieItem } from '@/components/ChartColumn'
import DbCompDelete from './DbCompDelete'

interface IChartColumnOption {
  series: ISerieItem[]
  xaxis: {
    type: string
    categories: string[]
  }
}

interface IOption {
  series: ISerieItem[]
  xaxis: string[]
}

export default function DbCompColumn({ id, config, title }: IDbCompProps) {
  const [updateCounter, setUpdateCounter] = useState(0)
  const { statuses } = useProjectStatusStore()
  const [data, setData] = useState({
    loading: true,
    title: title
  })

  const [opt, setOpt] = useState<IOption>({
    series: [
      // {
      //   name: 'Todo',
      //   data: [44, 55, 41, 67, 22, 43, 10]
      // },
      // {
      //   name: 'Inprogress',
      //   data: [13, 23, 20, 8, 13, 27, 5]
      // },
      // {
      //   name: 'Review',
      //   data: [11, 17, 15, 15, 21, 14, 2]
      // },
      // {
      //   name: 'Closed',
      //   data: [21, 7, 25, 13, 22, 8, 80]
      // }
    ],
    xaxis: []
  })

  const options: IChartColumnOption = {
    series: opt.series,
    xaxis: {
      type: 'assignee',
      categories: opt.xaxis
    }
  }

  const convertToSerie = (columns: {
    [key: string]: { [key: string]: number }
  }) => {
    console.log('========')
    const series: ISerieItem[] = []
    const validSeries = Object.keys(columns[Object.keys(columns)[0]])

    // pre-define series array
    statuses.forEach(stt => {
      if (!validSeries.includes(stt.id)) return

      series.push({
        color: stt.color,
        name: stt.name,
        id: stt.id,
        data: []
      })
    })

    // now, fill series.data
    series.forEach(s => {
      const id = s.id
      for (const x in columns) {
        const columnData = columns[x]

        for (const p in columnData) {
          if (p === id) {
            s.data.push(columnData[p])
          }
        }
      }
    })

    return series
  }

  useEffect(() => {
    const newConfig = refactorConfig(config)
    dboardQueryColumn(newConfig as IDBComponentConfig).then(res => {
      // console.log(res.data)
      const { status, data } = res.data
      if (status !== 200) {
        return
      }

      const series = convertToSerie(data.columns)
      setOpt({
        series,
        xaxis: data.xAxis
      })
      console.log('chartData', series, data.xAxis)
    })
  }, [updateCounter, config])

  return (
    <div className="col-span-2 py-4 px-5 w-[] border rounded-md bg-white shadow-sm hover:shadow-lg hover:shadow-gray-200 transition-all relative overflow-hidden group cursor-pointer">
      <h2 className="text-sm text-gray-600 flex items-center gap-1 ">
        {config.fixed ? <AiOutlineLock /> : null}
        {data.title}
        <Button
          onClick={() => setUpdateCounter(updateCounter + 1)}
          leadingIcon={<AiOutlineSync />}
          size="sm"
        />
      </h2>
      <DbCompDelete id={id}/>
      <div className="bg-indigo-50/20 border border-indigo-50 rounded pb-5 mt-3">
        <ChartColumn options={options} />
      </div>
    </div>
  )
}
