import { projectGet } from '@/services/project'
import { useProjectStore } from '@/store/project'
import { useEffect, useState } from 'react'
import ProjectItem from './ProjectItem'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'


function LoadingSkeleton({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return <>{[1, 2, 3].map(item => {
    return <motion.div
      key={item}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="">
      <div className="project-item group relative">
        <div className='w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 animate-pulse'></div>
        <div className="overflow-hidden">
          <h2 className="text-lg text-transparent bg-gray-100 dark:bg-gray-700 animate-pulse rounded-md h-[20px] w-[100px]" >No title</h2>
          <p className="text-xs text-transparent bg-gray-100 dark:bg-gray-700 animate-pulse rounded-md mt-[9px] w-[70px]">
            <span className="flex items-center gap-1">notitle</span>
          </p>
        </div>
      </div>
    </motion.div>

  })}</>
}

export default function ProjectAvailable() {
  const { projects, addAllProject } = useProjectStore(state => state)
  const { orgID } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!projects.length) {
      setLoading(true)
      projectGet({
        orgId: orgID,
        isArchive: false
      }).then(result => {
        setLoading(false)
        const { data, status } = result.data
        // const projects = data as Project[]
        if (status !== 200) return

        addAllProject(data)
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }
  }, [JSON.stringify(projects)])
  return (
    <div>
      <h2 className="text-lg mb-3 text-gray-500">Available projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <LoadingSkeleton enabled={loading} />
        {!loading && projects.map(project => {
          return <ProjectItem key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}
