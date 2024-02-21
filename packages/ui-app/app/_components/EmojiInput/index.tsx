import useOutsideClick from '@/hooks/useOutsideClick'
import EmojiPicker, { EmojiStyle, Categories } from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import './style.css'

export const randIcon = () => {
  const icons = [
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f98d.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f9a7.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f437.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f418.png',

    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f438.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f426.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f33b.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f332.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f341.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f951.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f955.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f344.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f96f.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f354.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f35f.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f36c.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f45b.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f451.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1fa73.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1fa95.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f941.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f4d5.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f4f0.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f4b5.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f4bc.png',
    'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f4c1.png',
  ]

  return icons[Math.round(Math.random() * icons.length - 1)]
}
export interface IEmojiInputProps {
  className?: string
  size?: 'sm' | 'base' | 'lg'
  value?: string
  onChange?: (val: string) => void
}
export default function EmojiInput({
  className,
  size,
  value,
  onChange
}: IEmojiInputProps) {
  const [selected, setSelected] = useState(value || '')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useOutsideClick(ref, () => {
    setVisible(false)
  })

  useEffect(() => {
    if (value !== selected) {
      setSelected(value || '')
    }
  }, [value])

  const categories = [
    { name: 'Animals', category: Categories.ANIMALS_NATURE },
    { name: 'Food n Drink', category: Categories.FOOD_DRINK },
    { name: 'Objects', category: Categories.OBJECTS },
    { name: 'Face', category: Categories.SMILEYS_PEOPLE }
  ]

  let iconSize = 'w-5 h-5'

  size === 'sm' && (iconSize = 'w-4 h-4')
  size === 'lg' && (iconSize = 'w-7 h-7')

  const iconUrl = selected
    ? selected
    : 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f98d.png'

  return (
    <div
      className={`form-control shrink-0 form-emoji ${className}`}
      onClick={ev => {
        ev.stopPropagation()
      }}>
      {/* <label>Project icon</label> */}
      <div className="relative" ref={ref}>
        <div
          className="form-input cursor-pointer hover:bg-gray-50 "
          onClick={() => setVisible(!visible)}>
          <img src={iconUrl} className={iconSize} />
        </div>
        {visible ? (
          <div className={`absolute z-10 top-11 ${visible ? '' : 'hidden'}`}>
            <EmojiPicker
              skinTonesDisabled={true}
              lazyLoadEmojis={true}
              categories={categories}
              emojiStyle={EmojiStyle.TWITTER}
              onEmojiClick={emoji => {
                const emojiUrl = emoji.getImageUrl(EmojiStyle.TWITTER)
                // const emojiNative = emoji.emoji
                setSelected(emojiUrl)
                onChange && onChange(emojiUrl)
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
