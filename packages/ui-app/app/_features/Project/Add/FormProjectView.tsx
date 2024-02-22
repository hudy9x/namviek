import { ProjectViewType } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function FormProjectView({
  onChange
}: {
  onChange?: (views: ProjectViewType[]) => void
}) {
  const views = [
    { type: ProjectViewType.BOARD, img: 'board', title: 'Board' },
    { type: ProjectViewType.LIST, img: 'list', title: 'List' },
    { type: ProjectViewType.CALENDAR, img: 'calendar', title: 'Calendar' },
    { type: ProjectViewType.GOAL, img: 'gantt', title: 'Goal' },
    { type: ProjectViewType.TEAM, img: 'team', title: 'Team' },
    { type: ProjectViewType.DASHBOARD, img: 'workload', title: 'Dashboard' }
  ]
  const [selected, setSelected] = useState<number[]>([0])

  useEffect(() => {
    triggerOnChange([0])
  }, [])

  const triggerOnChange = (indexes: number[]) => {
    const selectedViews: ProjectViewType[] = []
    indexes.forEach(id => {
      const v = views[id]
      if (!v) return

      selectedViews.push(v.type)
    })

    onChange && onChange(selectedViews)
  }

  const onSelect = (isSelected: boolean, vindex: number) => {
    if (isSelected) {
      setSelected(prev => {
        if (prev.length === 1) return prev

        const filtered = prev.filter(p => p !== vindex)
        triggerOnChange(filtered)

        return filtered
      })
      return
    }
    setSelected(prev => {
      const newSelected = [...prev, ...[vindex]]
      triggerOnChange(newSelected)

      return newSelected
    })
  }

  return (
    <section className="form-control">
      <label>Project view</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {views.map((view, vindex) => {
          const position = selected.findIndex(s => s === vindex)

          const isSelected = selected.includes(vindex)
          const classes = isSelected
            ? 'bg-indigo-50/50 border-indigo-300 dark:bg-indigo-300/30 dark:border-indigo-600'
            : 'bg-gray-100 dark:bg-gray-800'
          return (
            <div
              key={vindex}
              onClick={() => {
                onSelect(isSelected, vindex)
              }}
              className="cursor-pointer group">
              <div className={`p-1 rounded-md ${classes} relative border-2 dark:border-gray-700`}>
                <img src={`/project-view/${view.img}.svg`} />
                {isSelected ? (
                  <span className="absolute top-1 right-1 text-[10px] p-1 rounded-full bg-gray-200 dark:bg-gray-900 border dark:border-gray-800 w-5 h-5 flex items-center justify-center ">
                    {position + 1}
                  </span>
                ) : null}
              </div>
              <h3 className="text-center text-[10px] font-medium uppercase mt-1">
                {view.title}
              </h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}
