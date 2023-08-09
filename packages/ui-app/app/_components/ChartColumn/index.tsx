import MemberAvatar from '@/components/MemberAvatar'
import { createContext, useContext } from 'react'
import './column.css'

interface ChartColumnContext {
  columns: IColumns[]
  chartHeight: number
  heightPerRow: number
  max: number
  yaxis: number[]
}
const ChartColContext = createContext<ChartColumnContext>({
  columns: [],
  chartHeight: 300,
  heightPerRow: 30,
  yaxis: [],
  max: 0
})
const ChartColProvider = ChartColContext.Provider

const useChartContext = () => {
  const context = useContext(ChartColContext)
  return context
}

export interface ICol {
  color?: string
  name: string
  data: number
}

interface IColumns {
  name: string
  type: string
  data: ICol[]
}

export interface ISerieItem {
  name: string
  id?: string
  color?: string
  data: number[]
}

interface IChartColumnOption {
  series: ISerieItem[]
  xaxis: {
    type: string
    categories: string[]
  }
}

// series: [
// {
//   name: 'Todo',
//   color: 'red',
//   data: [44, 55, 41, 67, 22, 43, 10]
// },
// {
//   name: 'Inprogress',
//   color: 'red',
//   data: [13, 23, 20, 8, 13, 27, 5]
// },
// {
//   name: 'Review',
//   color: 'red',
//   data: [11, 17, 15, 15, 21, 14, 2]
// },
// {
//   name: 'Closed',
//   color: 'red',
//   data: [21, 7, 25, 13, 22, 8, 80]
// }
// ],
// xaxis: [
//
//   type: 'assignee',
//   categories: ['Jame', 'user2', 'user3', 'user4', 'user6', 'user9']
// ]
//

const useChartColumn = (options: IChartColumnOption) => {
  let max = 0
  const chartHeight = 300
  const heightPerRow = 30
  const yaxisLen = Math.ceil(chartHeight / heightPerRow)
  const type = options.xaxis.type
  const xaxis = options.xaxis.categories
  const columns: IColumns[] = []

  // assign values to each column
  xaxis.map((x, xid) => {
    const series = options.series
    const col: ICol[] = []
    let m = 0

    // push val into stacked cell
    series.map(s => {
      const val = s.data[xid]
      m += val
      col.push({ name: s.name, data: val, color: s.color })
    })

    max = m > max ? m : max

    // join all stacked cell into a column
    columns.push({
      name: x,
      type,
      data: col
    })
  })

  // calculate total value to generate y axis
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

  return {
    columns,
    chartHeight,
    heightPerRow,
    yaxis,
    max
  }
}

const ChartColumnY = () => {
  const { yaxis, heightPerRow } = useChartContext()
  return (
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
  )
}

const ChartColumnXName = ({ name }: IColumns) => {
  return (
    <div className="chart-column-name absolute -bottom-[35px] left-[50%] -translate-x-[50%] text-xs rounded">
      <MemberAvatar uid={name} />
    </div>
  )
}

const ChartColumnTooltip = ({ val }: { val: number }) => {
  return (
    <div className="absolute z-10 px-3 h-[25px] left-[50%] -translate-x-[50%] -top-[30px] bg-black/80 hidden rounded pointer-events-none group-hover/col-cell:flex items-center justify-center text-white text-sm">
      {val}
    </div>
  )
}

const ChartStackedCell = ({ data, color }: { data: ICol; color: string }) => {
  const { max } = useChartContext()
  const val = data.data
  const height = (val / max) * 100

  return (
    <div
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
        <ChartColumnTooltip val={val} />
      </div>
    </div>
  )
}

const ChartColumnX = () => {
  const { columns } = useChartContext()
  // re-calculate column with in order to make them fit to chart area
  const xAxisOffsetLeft = 60
  const columnGap = 15
  const columnLen = columns.length
  const columnXOffset = Math.floor(xAxisOffsetLeft / columnLen)
  const columnWidth = Math.floor(100 / columnLen)

  return (
    <div
      className="chart-column-items absolute bottom-0 h-full w-full flex"
      style={{ gap: columnGap, left: xAxisOffsetLeft }}>
      {columns.map((col, colIndex) => {
        const colDatas = col.data
        const total = colDatas.reduce((t, c) => {
          return t + c.data
        }, 0)

        return (
          <div
            key={colIndex}
            style={{
              width: `calc(${columnWidth}% - ${columnGap}px - ${columnXOffset}px)`
            }}
            className="h-full hover:bg-gray-100 flex flex-col-reverse relative">
            <ChartColumnXName {...col} />
            {colDatas.map((cd, cdidx) => {
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
                <ChartStackedCell
                  color={cd.color || color}
                  key={cdidx}
                  data={cd}
                />
              )
            })}
            <div className="text-xs text-center text-gray-400">{total}</div>
          </div>
        )
      })}
    </div>
  )
}

const ChartColumnLegend = ({ series }: { series: ISerieItem[] }) => {
  return (
    <div className="mb-4 flex items-center flex-wrap gap-3 justify-center">
      {series.map((legend, lidx) => {
        return (
          <div key={lidx} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded"
              style={{ backgroundColor: legend.color || 'blue' }}></span>
            <span className="text-xs">{legend.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function ChartColumn({
  options
}: {
  options: IChartColumnOption
}) {
  const { chartHeight, yaxis, heightPerRow, columns, max } =
    useChartColumn(options)

  return (
    <ChartColProvider
      value={{
        yaxis,
        max,
        chartHeight,
        heightPerRow,
        columns
      }}>
      <div className='mt-5'>
        <ChartColumnLegend series={options.series} />
        <div
          className="w-full relative mb-[30px]"
          style={{ height: chartHeight }}>
          <ChartColumnY />
          <ChartColumnX />
        </div>
      </div>
    </ChartColProvider>
  )
}
