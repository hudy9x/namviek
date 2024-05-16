import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useTheme } from 'next-themes'

export default function ThemeSelection() {
  const { setTheme, theme } = useTheme()
  const isDarkMode = theme === 'dark' ? true : false
  const isLightMode = !isDarkMode
  return (
    <section className="cursor-pointer">

      <div className='rounded-full flex items-center bg-gray-100 dark:bg-gray-800 dark:border-gray-700'>
        <HiOutlineSun
          className={`main-nav-icon w-7 h-4 rounded-full ${isLightMode ? 'bg-indigo-400 text-white' : ''}`}
          onClick={() => setTheme('light')}
        />

        <HiOutlineMoon
          className={`main-nav-icon w-7 h-4 p-0.5 rounded-full ${isDarkMode ? 'bg-indigo-600' : ''}`}
          onClick={() => setTheme('dark')}
        />

      </div>

      {/* {theme === 'dark' ? ( */}
      {/*   <HiOutlineSun */}
      {/*     className="main-nav-icon" */}
      {/*     onClick={() => setTheme('light')} */}
      {/*   /> */}
      {/* ) : ( */}
      {/*   <HiOutlineMoon */}
      {/*     className="main-nav-icon" */}
      {/*     onClick={() => setTheme('dark')} */}
      {/*   /> */}
      {/* )} */}
    </section>
  )
}
