import './style.css'
import { useVisionContext } from '../Vision/context'
import { genCalendarArr, getDayName, isSunSat, isToday } from '@shared/libs'
import VisionViewMode from '../Vision/VisionViewMode'

import VisionMonthNavigator from '../Vision/VisionMonthNavigator'
import AbsoluteLoading from '@/components/AbsoluateLoading'
import VisionTimelineTrack from './VisionTimelineTrack'

export default function VisionTimeline({ visible }: { visible: boolean }) {
  const { visions, filter, loading } = useVisionContext()

  const ed = new Date()
  const w1 = genCalendarArr(new Date(ed.getFullYear(), filter.month - 1, 1))
  const w2 = genCalendarArr(new Date(ed.getFullYear(), filter.month - 2, 1))
  const w3 = genCalendarArr(new Date(ed.getFullYear(), filter.month + 1, 1))

  // const weeks = [...w2, ...w1, ...w3]
  const weeks = w1
  const dateMap = new Map()

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
      totalDates++
      dateMap.set(`${d.getDate()}-${d.getMonth()}`, totalDates)

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

  console.log(monthColumns)

  const today = new Date()

  let startWeek = 1

  return (
    <div
      className="vision-timeline-container mx-auto relative"
      style={{ maxWidth: `calc(100vw - 340px)` }}>
      <AbsoluteLoading enabled={loading} />
      <div className="py-3 flex items-center justify-between">
        <div>
          <VisionMonthNavigator />
        </div>
        <VisionViewMode />
      </div>
      <div
        className={`flex items-start bg-white dark:bg-gray-900 border dark:border-gray-700 p-0.5 rounded-md ${
          visible ? '' : 'hidden'
        }`}>
        <section className="vision-timeline-list shrink-0">
          <header className="border-b dark:border-gray-700 flex justify-center h-[78px]">
            <h2 className=" leading-[78px] text-sm">Timeline</h2>
          </header>
          <main className="vision-timeline-content divide-y divide-gray-100 dark:divide-gray-700">
            {visions.map(vision => {
              return (
                <div
                  style={{ height: colHeight }}
                  className={`vision-timeline-item flex items-center`}
                  key={vision.id}>
                  {vision.name}
                </div>
              )
            })}
            <div className="px-2 text-sm flex items-center">
              Total: {visions.length}
            </div>
          </main>
        </section>
        <section className="vision-timeline">
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
          <main className="grid flex-auto grid-cols-1 grid-rows-1">
            <div
              className="vision-timeline-columns"
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
                gridTemplateRows: `repeat(${visions.length}, minmax(${colHeight}, 1fr)) auto`
              }}>
              {visions.map((vision, index) => {
                const dueDate = vision.dueDate
                const startDate = vision.startDate
                const keyEnd = `${dueDate?.getDate()}-${dueDate?.getMonth()}`
                const keyStart = `${startDate?.getDate()}-${startDate?.getMonth()}`

                const end = dateMap.get(keyEnd) + 1
                const start = dateMap.get(keyStart) || end - 1

                return (
                  <div
                    key={vision.id}
                    className="grid hover:bg-indigo-50/50 dark:hover:bg-indigo-300/10 relative"
                    style={{
                      gridRowStart: index + 1,
                      gridColumnStart: 1,
                      gridColumnEnd: totalDates + 1,
                      gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
                    }}>
                    <VisionTimelineTrack
                      {...{
                        onChange: (start, end) => {
                          console.log('change', start, end)
                          console.log(dateMap.get(start))
                          console.log(dateMap.get(end))
                        },
                        id: vision.id,
                        title: vision.name,
                        name: vision.name,
                        startCol: start,
                        endCol: end,
                        height: colHeight
                      }}
                    />
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
