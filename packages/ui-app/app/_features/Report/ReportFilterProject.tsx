import { useProjectStore } from "@/store/project"
import { useReportContext } from "./context"

export default function ReportFilterProject() {
  const { projects } = useProjectStore()
  const { toggleProjectIds, selectedProjectIds } = useReportContext()

  return <div className='report-filter-project'>
    {projects.map(p => {
      const isActive = selectedProjectIds.includes(p.id) ? 'active' : ''
      return <div onClick={() => {
        toggleProjectIds(p.id)
      }} className={`report-filter-project-item ${isActive}`} key={p.id}>
        <div className="flex items-center gap-2">
          <img className="w-6 h-6" src={p.icon || ''} />
          <span className="text-sm">
            {p.name}
          </span>
        </div>
      </div>
    })}
  </div>
}
