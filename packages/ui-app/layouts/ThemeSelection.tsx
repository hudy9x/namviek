import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useTheme } from 'next-themes'

export default function ThemeSelection() {
  const { setTheme, theme } = useTheme()
  console.log(theme)
  return (
    <section className="relative">
      {theme === 'dark' ? (
        <HiOutlineSun
          className="w-6 h-6 p-0.5 hover:scale-110 border border-yellow-800 bg-yellow-400/10 cursor-pointer rounded-md text-yellow-400"
          onClick={() => setTheme('light')}
        />
      ) : null}
      {theme === 'light' ? (
        <HiOutlineMoon
          className="w-6 h-6 p-1 hover:scale-110 border cursor-pointer rounded-md text-indigo-600 bg-gray-50"
          onClick={() => setTheme('dark')}
        />
      ) : null}
    </section>
  )
}
