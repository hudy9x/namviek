import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useTheme } from 'next-themes'

export default function ThemeSelection() {
  const { setTheme, theme } = useTheme()
  return (
    <section className="">
      {theme === 'dark' ? (
        <HiOutlineSun
          className="main-nav-icon"
          onClick={() => setTheme('light')}
        />
      ) : (
        <HiOutlineMoon
          className="main-nav-icon"
          onClick={() => setTheme('dark')}
        />
      )}
    </section>
  )
}
