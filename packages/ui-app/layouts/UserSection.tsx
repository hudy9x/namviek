import { useUser } from '@goalie/nextjs'
import { Avatar, Popover } from '@shared/ui'
import ThemeSelection from './ThemeSelection'
import { HiOutlineChevronUp, HiOutlineCog, HiOutlineCog6Tooth, HiOutlineUser, HiOutlineUserPlus } from 'react-icons/hi2'
import Link from 'next/link'
import { IoMdLogOut } from 'react-icons/io'
import { TbUserCircle } from 'react-icons/tb'
import { HiOutlineColorSwatch, HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineCloudDownload } from 'react-icons/ai'

export default function UserSection() {
  const { user } = useUser()

  const menus = [
    {
      icon: TbUserCircle,
      link: `/profile/${user?.id}`,
      title: 'Update profile'
    },
    {
      icon: IoMdLogOut,
      link: `/sign-out`,
      title: 'Log out'
    }
  ]

  return (
    <section className="flex gap-2 items-center justify-between py-3 px-3 border-t dark:border-t-gray-800">
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
        {/* <Link href={`/profile/${user?.id}`}> */}
        <Popover
          triggerBy={<div>
            <HiOutlineDotsVertical className="w-6 h-6 p-0.5 border border-transparent bg-transparent dark:hover:bg-gray-800 dark:hover:border-gray-700 hover:bg-gray-50 hover:border-gray-100 cursor-pointer rounded-md text-gray-500" />
          </div>}
          content={<div className="border rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm py-1.5 w-[200px] mb-1">
            <div className="flex items-center justify-between gap-2 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className='flex items-center gap-2'>
                <HiOutlineColorSwatch className="text-gray-500 dark:text-gray-400 w-4 h-4" />
                <span className="text-xs text-gray-700 dark:text-gray-500">Appearance</span>
              </div>
              <ThemeSelection />
            </div>
            {menus.map((menu, midx) => {
              const Icon = menu.icon
              return <Link key={midx} href={menu.link} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Icon className="text-gray-500 dark:text-gray-400 w-4 h-4" />
                <span className="text-xs text-gray-700 dark:text-gray-500">{menu.title}</span>
              </Link>
            })}
          </div>}
        />

        {/* <Popover triggerBy={<div> */}
        {/*   <HiOutlineDotsVertical className="w-6 h-6 p-0.5 border border-transparent bg-transparent dark:hover:bg-gray-800 dark:hover:border-gray-700 hover:bg-gray-50 hover:border-gray-100 cursor-pointer rounded-md text-gray-500" /> */}
        {/* </div> */}
        {/* } */}
        {/*   content={ */}
        {/*     <div className='border rounded-md bg-white shadow-sm py-1.5 w-[150px]'> */}
        {/*       <div className='flex items-center gap-2'> */}
        {/*         <ThemeSelection /> */}
        {/*         <span className='text-sm'>Theme</span> */}
        {/*       </div> */}
        {/**/}
        {/*       <Link className='flex items-center gap-2' href={`/profile/${user?.id}`}> */}
        {/*         <TbUserCircle /> */}
        {/*         <span className='text-sm'>Update profile</span> */}
        {/*       </Link> */}
        {/**/}
        {/*       <Link className='flex items-center gap-2' href={`/sign-out`}> */}
        {/*         <IoMdLogOut /> */}
        {/*         <span className='text-sm'>Log out</span> */}
        {/*       </Link> */}
        {/*     </div> */}
        {/*   } */}
        {/* /> */}
        {/* </Link> */}
      </div>
    </section>
  )
}
