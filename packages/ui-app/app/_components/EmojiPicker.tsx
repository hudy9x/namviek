import useOutsideClick from '@/hooks/useOutsideClick'
import { Modal } from '@shared/ui'
import EmojiPicker, { EmojiStyle, Categories } from 'emoji-picker-react'
import { EmojiProperties } from 'emoji-picker-react/dist/dataUtils/DataTypes'
import { useEffect, useRef, useState } from 'react'

interface IEmojiInputProps {
  value?: string
  onChange?: (val: string) => void
}
export default function EmojiInput({ value, onChange }: IEmojiInputProps) {
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

  return (
    <div className="form-control shrink-0">
      {/* <label>Project icon</label> */}
      <div className="relative" ref={ref}>
        <div
          className="form-input cursor-pointer "
          onClick={() => setVisible(true)}>
          {!selected ? '😍' : null}
          {selected ? <img src={selected} className="w-5 h-5" /> : null}
        </div>
        {visible ? (
          <div className={`absolute z-10 top-11 ${visible ? '' : 'hidden'}`}>
            <EmojiPicker
              lazyLoadEmojis={true}
              categories={categories}
              emojiStyle={EmojiStyle.TWITTER}
              onEmojiClick={emoji => {
                const emojiUrl = emoji.getImageUrl(EmojiStyle.TWITTER)
                const emojiNative = emoji.emoji
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
