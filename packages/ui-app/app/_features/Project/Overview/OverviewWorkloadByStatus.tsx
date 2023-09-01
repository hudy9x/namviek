// import { useOverviewContext } from './context'

export default function OverviewWorkloadByStatus() {
  // const { tasks } = useOverviewContext()

  const reports = [
    { title: 'Complete Tasks', total: 8, icon: '🎄', color: '#32e52f' },
    { title: 'In progress Tasks', total: 3, icon: '🚀', color: '#7d9de5' },
    { title: 'Upcoming Tasks', total: 5, icon: '🔮', color: '#ededed' }
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {reports.map((r, idx) => {
        return (
          <div
            key={idx}
            className="py-4 px-5 w-[] border rounded-md bg-white shadow-sm relative overflow-hidden group cursor-pointer">
            <span className="absolute -bottom-10 right-4 text-[70px] opacity-30 group-hover:-bottom-6 transition-all group-hover:opacity-100">
              {r.icon}
            </span>
            <h2 className="text-sm text-gray-600 ">{r.title}</h2>
            <div className="font-bold text-[40px] leading-none mt-1">
              {r.total > 9 ? r.total : `0${r.total}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}
