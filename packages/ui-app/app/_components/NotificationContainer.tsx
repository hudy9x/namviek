import { Popover, Scrollbar } from '@shared/ui'
import Link from 'next/link'
import { useNotificationStore } from '@/store/notification'
import { ReactNode } from 'react'
import { useUpdateNotification } from '@/features/Notification/useUpdateNotification'

export function NotificationContainer({ children }: { children: ReactNode }) {
  const { notifications } = useNotificationStore()
  const unreadNotiNum = notifications.filter(({ isRead }) => !isRead).length
  const { updateNotificationRead } = useUpdateNotification()

  const menus = notifications.map(notification => {
    const {
      content: { title, data },
      id,
      isRead
    } = notification

    if (!data) {
      return { title, link: null }
    }
    // console.log({ NotificationContainerData: data })
    const { link } = data as { link: string }
    return { title, link, id, isRead }
  })

  const handleClickNotificationEvent = (id?: string) => {
    console.log({ handleClickNotificationEvent: id })
    if (!id) return
    updateNotificationRead(id)
  }

  const numNoti = menus.length

  return (
    <div>
      <Popover
        triggerBy={
          <div className="relative">
            <div className="absolute w-full h-full z-50 text-center cursor-pointer">
              {unreadNotiNum}
            </div>
            {children}
          </div>
        }
        content={
          <>
            {numNoti ? (
              <div className="border rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm py-1.5 w-[150px] mt-1 ">
                <Scrollbar>
                  {menus.map((menu, midx) => {
                    let className =
                      'flex items-center gap-2 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800'
                    const { isRead } = menu
                    if (isRead) {
                      className += ' bg-gray-400 dark:bg-gray-500'
                    }
                    return (
                      <Link
                        onClick={() => handleClickNotificationEvent(menu.id)}
                        key={midx}
                        href={menu.link ?? '#'}
                        className={className}>
                        {/* <Icon className="text-gray-500 dark:text-gray-400 w-4 h-4" /> */}
                        <span className="text-xs text-gray-700 dark:text-gray-500">
                          {menu.title}
                        </span>
                      </Link>
                    )
                  })}
                </Scrollbar>
              </div>
            ) : null}
          </>
        }
      />
    </div>
  )
}
