import { useUser } from '@goalie/nextjs'
import { Avatar } from '@shared/ui'

export default function UserSection() {
  const { user } = useUser()

  return (
    <section className="flex gap-2 items-center py-[19px] px-3">
      <Avatar src={user?.photo || ''} name={user?.name || ''} />
      <div className="flex flex-col text-sm">
        <span className="text-gray-700 dark:text-gray-400">{user?.name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {user?.email}
        </span>
      </div>
    </section>
  )
}
