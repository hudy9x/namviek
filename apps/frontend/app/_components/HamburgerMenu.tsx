import { useMenuStore } from '@/store/menu'
import { useEffect } from 'react'
import { HiOutlineBars3 } from 'react-icons/hi2'

export default function HamburgerMenu() {
  const { visible, toggleMenu } = useMenuStore()

  useEffect(() => {
    const rootSidebar = document.querySelector('.root-sidebar')

    if (rootSidebar) {
      if (visible) {
        rootSidebar.setAttribute('style', 'display: flex !important')
      } else {
        rootSidebar.setAttribute('style', 'display: hidden !important')
      }
    }
  }, [visible])

  return (
    <div className="flex sm:hidden justify-between py-2 px-3 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div
        onClick={toggleMenu}
        className="py-1.5 px-2 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 sm:hidden">
        <HiOutlineBars3 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  )
}
