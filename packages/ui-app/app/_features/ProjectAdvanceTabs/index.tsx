import { useParams, useRouter, useSearchParams } from "next/navigation";
import HasRole from "../UserPermission/HasRole";
import { HiOutlineCog6Tooth, HiOutlineCpuChip } from "react-icons/hi2";

export default function ProjectAdvanceTabs() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const params = useParams()
  const mode = searchParams.get('mode')


  const onMoveTab = (name: string) => {
    push(`${params.orgName}/project/${params.projectId}?mode=${name}`)
  }

  const onMoveTabAdvance = (name: string, tab: string) => {
    push(`${params.orgName}/project/${params.projectId}?mode=${name}&tab=${tab}`)
  }

  return <div className="project-advance-tabs flex items-center gap-2">
    <div className="tab">
      <HasRole projectRoles={['MANAGER', 'LEADER']}>
        <div
          className={`tab-item ${['automation', 'automation-create'].includes(mode || '')
            ? 'active'
            : ''
            }`}
          onClick={() => onMoveTabAdvance('automation', 'rule')}>
          <HiOutlineCpuChip />
          <span>Automation</span>
        </div>
      </HasRole>
      <HasRole projectRoles={['MANAGER', 'LEADER', 'MEMBER']}>
        <div
          className={`tab-item ${mode === 'setting' ? 'active' : ''}`}
          onClick={() => onMoveTab('setting')}>
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </div>
      </HasRole>
    </div>
  </div>
}
