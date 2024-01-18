import { useUser } from '@goalie/nextjs'
import { Avatar } from '@shared/ui'
import ThemeSelection from './ThemeSelection'

export default function UserSection() {
  const { user } = useUser()

  return (
    <section className="flex gap-2 items-center justify-between py-[21px] px-3 border-b dark:border-b-gray-800">
      <div className="flex gap-2 items-center">
        <Avatar src={user?.photo || ''} name={user?.name || ''} />
        <div className="flex flex-col text-sm">
          <span className="text-gray-700 dark:text-gray-400">{user?.name}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {user?.email}
          </span>
        </div>
      </div>
      <ThemeSelection />
    </section>
  )
}
