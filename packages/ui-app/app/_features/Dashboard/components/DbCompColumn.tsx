import {
  IDBComponentConfig,
  dboardQueryColumn,
  dboardQuerySummary
} from '@/services/dashboard'
import { useEffect, useState } from 'react'
import { AiOutlineLock, AiOutlineSync } from 'react-icons/ai'
import { ICompConfig, IDbCompProps, refactorConfig } from '../type'
import { Button } from '@shared/ui'
import { useProjectStatusStore } from '@/store/status'
import { useMemberStore } from '@/store/member'
import MemberAvatar from '@/components/MemberAvatar'
import './column.css'

interface ICol {
  name: string
  data: number
}

interface IColumns {
  xaxis: string
  data: ICol[]
}

interface ISerieItem {
  name: string
  id?: string
  data: number[]
}

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

export default function DbCompColumn({ config, title }: IDbCompProps) {
  const [updateCounter, setUpdateCounter] = useState(0)
  const { statuses } = useProjectStatusStore()
  const { members } = useMemberStore()
  const [data, setData] = useState({
    loading: true,
    title: title,
    icon: config.icon as string,
    summary: 0,
    percent: 0,
    color: ''
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

  let max = 0
  const chartHeight = 300
  const heightPerRow = 30
  const yaxisLen = Math.ceil(chartHeight / heightPerRow)
  const xaxis = options.xaxis.categories

  console.log('------------------start')
  const columns: IColumns[] = []
  xaxis.map((x, xid) => {
    const series = options.series
    const col: ICol[] = []
    let m = 0
    series.map(s => {
      const val = s.data[xid]
      m += val
      col.push({ name: s.name, data: val })
    })

    max = m > max ? m : max

    columns.push({
      xaxis: x,
      data: col
    })
  })

  const yValPerCell = Math.ceil(max / yaxisLen)
  let totalYVal = yValPerCell
  let yaxis = new Array(yaxisLen).fill(1).map((yval, yindex) => {
    if (yindex === 0) return totalYVal

    totalYVal += yValPerCell

    max = max > totalYVal ? max : totalYVal

    return totalYVal
  })

  yaxis.unshift(0)
  yaxis = yaxis.reverse()

  const xAxisOffsetLeft = 60
  const columnGap = 15
  const columnLen = columns.length
  const columnXOffset = Math.floor(xAxisOffsetLeft / columnLen)
  const columnWidth = Math.floor(100 / columnLen)

  const convertToSerie = (columns: {
    [key: string]: { [key: string]: number }
  }) => {
    console.log('========')
    const series: ISerieItem[] = []
    const validSeries = Object.keys(columns[Object.keys(columns)[0]])

    statuses.forEach(stt => {
      if (!validSeries.includes(stt.id)) return

      series.push({
        name: stt.name,
        id: stt.id,
        data: []
      })
    })

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
  }, [updateCounter])

  console.log(yaxis)

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
      <div>
        <div
          className="w-full relative my-[30px]"
          style={{ height: chartHeight }}>
          <div className="chart-column-yasix absolute bottom-0 left-0 h-full w-full">
            {yaxis.map((y, yi) => {
              return (
                <div
                  key={yi}
                  style={{ height: heightPerRow }}
                  className="text-xs flex">
                  <div
                    className="text-right text-gray-500 border-r pr-1 shrink-0"
                    style={{ width: 30 }}>
                    {y}
                  </div>
                  <div className="border-t w-full border-dashed"></div>
                </div>
              )
            })}
          </div>
          <div
            className="chart-column-items absolute bottom-0 h-full w-full flex"
            style={{ gap: columnGap, left: xAxisOffsetLeft }}>
            {columns.map(col => {
              const colDatas = col.data
              const total = colDatas.reduce((t, c) => {
                return t + c.data
              }, 0)

              return (
                <div
                  key={col.xaxis}
                  style={{
                    width: `calc(${columnWidth}% - ${columnGap}px - ${columnXOffset}px)`
                  }}
                  className="h-full hover:bg-gray-100 flex flex-col-reverse relative">
                  <div className="chart-column-name absolute -bottom-[35px] left-[50%] -translate-x-[50%] text-xs rounded">
                    <MemberAvatar uid={col.xaxis} />
                  </div>
                  {colDatas.map((cd, cdidx) => {
                    const val = cd.data
                    const height = (val / max) * 100

                    let color
                    switch (cdidx) {
                      case 0:
                        color = 'blue'
                        break
                      case 1:
                        color = 'green'
                        break
                      case 2:
                        color = 'violet'
                        break

                      default:
                        color = 'orange'
                        break
                    }

                    return (
                      <div
                        key={cdidx}
                        className="w-full flex items-center transition-all"
                        style={{
                          height: height + '%'
                        }}>
                        <div
                          className="w-full rounded relative group/col-cell hover:border-2 hover:border-indigo-400"
                          style={{
                            height: `calc(100% - 1px)`,
                            backgroundColor: color
                          }}>
                          <div className="absolute z-10 px-3 h-[25px] left-[50%] -translate-x-[50%] -top-[30px] bg-black/80 hidden rounded pointer-events-none group-hover/col-cell:flex items-center justify-center text-white text-sm">
                            {val}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="text-xs text-center text-gray-400">
                    {total}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}