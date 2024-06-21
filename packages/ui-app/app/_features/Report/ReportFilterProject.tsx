import { useProjectStore } from "@/store/project"
import { useReportContext } from "./context"

export default function ReportFilterProject() {
  const { projects } = useProjectStore()
  const { toggleProjectIds, selectedProjectIds } = useReportContext()

  const allSelectedProjects = projects.filter(p => !selectedProjectIds.includes(p.id))

  return <div>
    <small className="uppercase text-[10px]">Project filter</small>
    <div className='report-filter-project'>
      {!allSelectedProjects.length ? <div className="text-xs px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">All projects has selected !</div> : null}
      {allSelectedProjects.map(p => {
        // const isActive = selectedProjectIds.includes(p.id) ? 'active' : ''
        // if (isActive) return null

        return <div onClick={() => {
          toggleProjectIds(p.id)
        }} className={`report-filter-project-item`} key={p.id}>
          <div className="flex items-center gap-2">
            <img className="w-5 h-5" src={p.icon || ''} />
            <span className="text-xs">
              {p.name}
            </span>
          </div>
        </div>
      })}
    </div>
  </div>
}
