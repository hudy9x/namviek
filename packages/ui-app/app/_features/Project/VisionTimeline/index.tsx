import './style.css'
import { useVisionContext } from '../Vision/context'
import { genCalendarArr, isSunSat, isToday } from '@shared/libs'
import VisionViewMode from '../Vision/VisionViewMode'
import VisionTimelineTrack from './VisionTimelineTrack'
import VisionMonthNavigator from '../Vision/VisionMonthNavigator'

export default function VisionTimeline({ visible }: { visible: boolean }) {
  const { visions } = useVisionContext()
  const weeks = genCalendarArr(new Date())
  const dateMap = new Map()

  let totalDates = 0
  const colWidth = '2rem'
  const colHeight = '2.75rem'

  weeks.forEach(w => {
    w.forEach(d => {
      totalDates++
      dateMap.set(`${d.getDate()}-${d.getMonth()}`, totalDates)
    })
  })

  const today = new Date()

  return (
    <div className="vision-timeline-container mx-5">
      <div className="py-3 flex items-center justify-between">
        <div>
          <VisionMonthNavigator />
        </div>
        <VisionViewMode />
      </div>
      <div
        className={`flex items-start bg-white border p-0.5 rounded-md ${visible ? '' : 'hidden'
          }`}>
        <section className="vision-timeline-list shrink-0">
          <header className="border-b flex justify-center h-7">
            <h2 className=" leading-7 text-sm">Timeline</h2>
          </header>
          <main className="vision-timeline-content divide-y divide-gray-100">
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
          </main>
        </section>
        <section className="vision-timeline">
          <header
            className="grid divide-x"
            style={{
              gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
            }}>
            {weeks.map(w => {
              return w.map(d => {
                const isWeekend = isSunSat(d) ? 'bg-gray-50' : ''
                return (
                  <div
                    className={`h-7 border-b text-xs text-center leading-7 text-gray-500 ${isWeekend}`}
                    key={d.getTime()}>
                    {d.getDate()}
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
                  const isWeekend = isSunSat(d) ? 'bg-gray-50' : ''
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
                console.log(vision)

                return (
                  // <VisionTimelineTrack
                  //   key={vision.id}
                  //   {...{
                  //     id: vision.id,
                  //     startCol: start,
                  //     endCol: end,
                  //     rowStart: index + 1
                  //   }}
                  // />
                  <div
                    key={vision.id}
                    className="grid hover:bg-indigo-50/50 relative"
                    style={{
                      gridRowStart: index + 1,
                      gridColumnStart: 1,
                      gridColumnEnd: totalDates + 1,
                      gridTemplateColumns: `repeat(${totalDates}, minmax(${colWidth}, 1fr)) auto`
                    }}>
                    <div
                      style={{
                        height: colHeight,
                        gridColumnStart: start,
                        gridColumnEnd: end
                        // gridRowStart: index + 1
                      }}
                      title={vision.name}
                      className="px-1 flex items-center relative">
                      <div className="whitespace-nowrap text-gray-600 w-full bg-white px-2.5 py-2 text-sm  rounded-md border shadow-md shadow-indigo-50">
                        {vision.name}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        </section>
      </div>
    </div>
  )
}
