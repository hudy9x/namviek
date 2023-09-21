import TaskFilter from '@/features/TaskFilter'
import TeamMember from './TeamMember'
import { useGroupBy } from './useGroupBy'

const TeamView = () => {
  const { groupByMember } = useGroupBy()

  return (
    <>
      <TaskFilter />
      <div className="grid grid-cols-3 gap-6  m-4">
        {groupByMember.map((item, index) => {
          return <TeamMember item={item} key={index} />
        })}
      </div>
    </>
  )
}

export default TeamView
