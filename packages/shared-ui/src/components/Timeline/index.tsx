import './style.css'
import { genCalendarArr, getDayName, isSunSat, isToday } from '@shared/libs'

import TimelineTrack from './TimelineTrack'
import { useMemo } from 'react'
import { ITimelineProps } from './type'
import TimelineList from './TimelineList'

export default function Timeline({
  month,
  year,
  items,
  children,
  onChange
}: ITimelineProps) {
  const w1 = useMemo(
    () => genCalendarArr(new Date(year, month - 1, 1)),
    [month, year]
  )

  const weeks = w1
  const dateMap = new Map()
  const gridMap = new Map()

  let totalDates = 0
  const colWidth = '2rem'
  const colHeight = '2.75rem'

  // calculate month columns - start
  let startMonth = 1
  let prevD: Date
  const monthColumns: { month: number; start: number; end: number }[] = []
  let pos = monthColumns.length - 1
  // calculate month columns - end

  weeks.forEach(w => {
    w.forEach(d => {
      const m = d.getMonth()
      const key = `${d.getDate()}-${d.getMonth()}`
      totalDates++
      dateMap.set(key, totalDates)
      gridMap.set(totalDates, d)

      // calculate month columns - start

      if (!prevD) {
        monthColumns.push({
          month: m,
          start: startMonth,
          end: startMonth + 1
        })

        pos = monthColumns.length - 1
        startMonth++
        prevD = d
        return
      }

      if (prevD.getMonth() === m) {
        monthColumns[pos].end = startMonth + 1
        startMonth++
        prevD = d
      } else {
        monthColumns.push({
          month: m,
          start: startMonth,
          end: startMonth + 1
        })
        pos = monthColumns.length - 1
        startMonth++
        prevD = d
      }
      // calculate month columns - end
    })
  })

  const updateDateRange = (id: string, start: number, end: number) => {
    let posStart = start
    let postEnd = end

    if (start > end) {
      posStart = end
      postEnd = start
    }

    const startDate = gridMap.get(posStart)
    const dueDate = gridMap.get(postEnd - 1)

    console.log(startDate, dueDate)

    onChange &&
      onChange({
        id,
        start: startDate,
        end: dueDate
      })
  }

  const today = new Date()

  let startWeek = 1

  return (
    <div className="timeline-container">
      <div
        className={`flex items-start bg-white dark:bg-gray-900 border dark:border-gray-700 p-0.5 rounded-md`}>
        <TimelineList items={items} height={colHeight} />
        <section className="timeline">
          <header
            className="grid divide-x"
            style={{
              gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
            }}>
            {monthColumns.map((m, index) => {
              const { month, start, end } = m

              return (
                <div
                  style={{
                    gridColumnStart: start,
                    gridColumnEnd: end
                  }}
                  className="border-b dark:border-gray-700 text-center dark:text-gray-400 text-sm h-7 leading-7 shrink-0"
                  key={index}>
                  <span className="text-gray-300 dark:text-gray-600 lowercase pr-0.5">
                    M
                  </span>
                  {month + 1}
                </div>
              )
            })}
          </header>
          <header
            className="grid divide-x"
            style={{
              gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
            }}>
            {weeks.map(w => {
              return w.map(d => {
                const isWeekend = isSunSat(d)
                  ? 'bg-gray-50 dark:bg-gray-800'
                  : ''
                return (
                  <div
                    className={`h-[50px] border-b dark:border-gray-700 text-xs text-center leading-7 text-gray-500 dark:text-gray-400 ${isWeekend}`}
                    key={d.getTime()}>
                    {d.getDate()}
                    <div className="text-[11px] leading-4">{getDayName(d)}</div>
                  </div>
                )
              })
            })}
          </header>
          <main className="grid flex-auto grid-cols-1 grid-rows-1 min-h-[100px]">
            <div
              className="timeline-columns"
              style={{
                gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
              }}>
              {weeks.map(w => {
                return w.map(d => {
                  const isWeekend = isSunSat(d)
                    ? 'bg-gray-50 dark:bg-gray-800'
                    : ''
                  return (
                    <div
                      className={`h-full text-sm text-center relative leading-7 text-gray-500 ${isWeekend}`}
                      key={d.getTime()}>
                      {isToday(today, d) ? (
                        <div className="absolute left-1/2 w-[1px] h-full bg-red-400"></div>
                      ) : null}
                    </div>
                  )
                })
              })}
            </div>
            <div
              className="grid vision-showup col-start-1 row-start-1"
              style={{
                gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`,
                gridTemplateRows: `repeat(${items.length}, minmax(${colHeight}, 1fr)) auto`
              }}>
              {items.map((item, index) => {
                const dueDate = item.end
                const startDate = item.start
                const keyEnd = `${dueDate?.getDate()}-${dueDate?.getMonth()}`
                const keyStart = `${startDate?.getDate()}-${startDate?.getMonth()}`

                const end = dateMap.get(keyEnd) + 1
                const start = dateMap.get(keyStart) || end - 1

                return (
                  <div
                    key={item.id}
                    className="grid hover:bg-indigo-50/50 dark:hover:bg-indigo-300/10 relative"
                    style={{
                      gridRowStart: index + 1,
                      gridColumnStart: 1,
                      gridColumnEnd: totalDates + 1,
                      gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
                    }}>
                    <TimelineTrack
                      {...{
                        onChange: (start, end) =>
                          updateDateRange(item.id, start, end),
                        id: item.id,
                        title: item.title,
                        name: item.title,
                        startCol: start,
                        endCol: end,
                        height: colHeight
                      }}>
                      {children(item)}
                    </TimelineTrack>
                  </div>
                )
              })}
            </div>
          </main>
          <header
            className="grid divide-x dark:divide-gray-700"
            style={{
              gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
            }}>
            {weeks.map((w, index) => {
              const start = startWeek
              const end = startWeek + 7
              startWeek = end

              return (
                <div
                  style={{
                    gridColumnStart: start,
                    gridColumnEnd: end
                  }}
                  className="border-t dark:text-gray-400 dark:border-gray-700 text-center text-sm h-7 leading-7 shrink-0"
                  key={index}>
                  W{index + 1}
                </div>
              )
            })}
          </header>
        </section>
      </div>
    </div>
  )
}
