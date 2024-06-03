import ProjectMemberView from "@/features/ProjectMember/View"
import { useProjectStore } from "@/store/project"

export default function ProjectHeader() {
  const { selectedProject } = useProjectStore(state => state)
  return <h2 className="text-xl pb-2 sm:pb-0 dark:text-gray-200 font-bold px-4 pt-2 flex items-center justify-between">
    <div className="flex items-center gap-2 mb-1">
      {/* <Link */}
      {/*   href={`${params.orgID}/project`} */}
      {/*   className="hidden sm:inline-block p-2 border rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:hover:bg-slate-800"> */}
      {/*   <AiOutlineArrowLeft /> */}
      {/* </Link> */}

      {selectedProject?.icon ? (
        <img
          alt={selectedProject.icon}
          src={selectedProject?.icon || ''}
          className="w-6 h-6"
        />
      ) : null}
      {selectedProject?.name || (
        <span className="text-transparent animate-pulse h-7 bg-gray-100 dark:bg-gray-700 rounded-md">
          Project
        </span>
      )}
    </div>
    <ProjectMemberView />
  </h2>
}
