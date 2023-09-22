import TaskFilter from '@/features/TaskFilter'
import { useMemberStore } from '@/store/member'
import TeamMember from './TeamMember'

const TeamView = () => {
  const { members } = useMemberStore(state => state)

  return (
    <>
      <TaskFilter />
      <div className="grid grid-cols-4 gap-6  m-4">
        {members.map((item, index) => {
          return <TeamMember user={item} key={item.id} />
        })}
      </div>
    </>
  )
}

export default TeamView
