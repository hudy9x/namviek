import { ITimelineItem } from './type'
import { HiOutlineInbox } from 'react-icons/hi2'

export default function TimelineList({
  items,
  height
}: {
  items: ITimelineItem[]
  height: string
}) {
  return (
    <section className="timeline-list shrink-0">
      <header className="border-b dark:border-gray-700 flex justify-center h-[78px]">
        <h2 className=" leading-[78px] text-sm">Timeline</h2>
      </header>
      <main className="timeline-content divide-y divide-gray-100 dark:divide-gray-700">
        {!items.length ? (
          <div className="py-4 flex items-center justify-center text-gray-400 text-sm">
            <div className="text-center">
              <HiOutlineInbox className="inline-block w-6 h-6" />
              <h2>No items found !</h2>
            </div>
          </div>
        ) : null}
        {items.map(item => {
          const { id, title } = item
          return (
            <div
              style={{ height }}
              className={`timeline-item flex items-center`}
              key={id}>
              {title}
            </div>
          )
        })}
        <div className="px-2 text-sm flex items-center">
          Total: {items.length}
        </div>
      </main>
    </section>
  )
}
