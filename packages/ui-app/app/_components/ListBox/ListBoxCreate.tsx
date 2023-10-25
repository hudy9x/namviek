import useOutsideClick from '@/hooks/useOutsideClick'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface IListBoxCreateProps {
  placeholder?: string
  guide?: string
  onEnter: (val: string) => void
}
export default function ListBoxCreate({
  placeholder = 'Create new !',
  guide = 'Hit `enter` to create and `esc` to exit',
  onEnter
}: IListBoxCreateProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const handleClickOutside = () => {
    if (visible) {
      setVisible(false)
      ref.current && (ref.current.value = '')
    }
  }

  useOutsideClick(ref, handleClickOutside)

  useEffect(() => {
    if (ref.current) {
      const inp = ref.current

      visible && inp.focus()
    }
  }, [visible])

  const onKeyup = (ev: KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    const target = ev.target as HTMLInputElement

    if (key.toLowerCase() === 'escape') {
      setVisible(false)
      target.value = ''
      return
    }

    if (key !== 'Enter') return

    const value = target.value

    onEnter && onEnter(value)

    target.value = ''
  }

  return (
    <div
      onClick={() => {
        setVisible(true)
      }}
      className={`cursor-pointer group px-3 py-2 text-sm rounded-b-md flex items-center justify-between ${visible ? 'bg-gray-50 dark:bg-gray-800' : ''
        }`}>
      <div className="flex items-center gap-2 w-full">
        <AiOutlinePlus
          className={`text-gray-500 shrink-0 ${visible ? 'text-indigo-500' : ''
            }`}
        />
        <span
          className={`text-gray-400 cursor-pointer group-hover:text-gray-500 ${visible ? 'hidden' : ''
            }`}
          onClick={() => setVisible(true)}>
          {placeholder}
        </span>
        <input
          ref={ref}
          onKeyUp={onKeyup}
          placeholder={guide}
          className={`bg-transparent outline-none w-full ${visible ? '' : 'hidden'
            }`}
        />
      </div>
    </div>
  )
}
