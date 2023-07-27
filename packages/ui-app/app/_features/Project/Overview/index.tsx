export default function ProjectOverview() {
  const reports = [
    { title: 'Upcoming Tasks', total: 5, icon: '💡' },
    { title: 'In progress Tasks', total: 3, icon: '🚀' },
    { title: 'Complete Tasks', total: 8, icon: '🎄' }
  ]
  return (
    <div className="w-[1024px] mx-auto">
      <div className="mx-3 mt-3 flex gap-3">
        {reports.map((r, idx) => {
          return (
            <div
              key={idx}
              className="py-6 px-7 w-[250px] border rounded-xl bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center text-sm w-7 h-7 p-1 border rounded-md bg-gray-50">{r.icon}</span>
                <h2 className="text-sm  text-gray-600 font-bold">{r.title}</h2>
              </div>
              <div className="font-bold text-[35px] mt-2">{r.total}</div>
            </div>
          )
        })}
      </div>

      <div className="mt-3">
        <div></div>
      </div>
    </div>
  )
}
