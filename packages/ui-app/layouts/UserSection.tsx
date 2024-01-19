import { useUser } from '@goalie/nextjs'
import { Avatar } from '@shared/ui'
import ThemeSelection from './ThemeSelection'
import { HiOutlineCog, HiOutlineCog6Tooth } from 'react-icons/hi2'
import Link from 'next/link'

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

      <div>
        <Link href={`/profile/${user?.id}`}>
          <HiOutlineCog6Tooth className="w-6 h-6 p-0.5 border border-transparent bg-transparent dark:hover:bg-gray-800 dark:hover:border-gray-700 hover:bg-gray-50 hover:border-gray-100 cursor-pointer rounded-md text-gray-500" />
        </Link>
      </div>
    </section>
  )
}
