'use client'

import * as Popover from '@radix-ui/react-popover'
import dynamic from 'next/dynamic'
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { useState } from 'react'

// Dynamically import EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

export const colors = [
  '#f9fafb', '#f3f4f6', '#d1d5db', '#9ca3af', '#4b5563', '#1f2937',
  '#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#65a30d',
  '#ecfdf5', '#d1fae5', '#6ee7b7', '#34d399', '#10b981', '#047857',
  '#fefce8', '#fef9c3', '#fde047', '#facc15', '#eab308', '#ca8a04',
  '#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#ec4899', '#be185d',
  '#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#dc2626'
]

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

type PickerState = { type: 'color'; value: string } | { type: 'emoji'; value: string }

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function IconColorPicker({ value, onChange }: ColorPickerProps) {
  const [pickerState, setPickerState] = useState<PickerState>(() => {
    if (!value) return { type: 'color', value: '#f9fafb' };
    return value.startsWith('#') ? { type: 'color', value } : { type: 'emoji', value };
  });
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'color' | 'emoji'>('color')

  const handleColorSelect = (color: string) => {
    setPickerState({ type: 'color', value: color })
    setIsOpen(false)
    onChange?.(color)
  }

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setPickerState({ type: 'emoji', value: emojiData.imageUrl })
    setIsOpen(false)
    onChange?.(emojiData.imageUrl)
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className="w-6 h-6 p-0.5 shrink-0 rounded-md shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity overflow-hidden border border-gray-300"
          style={pickerState.type === 'color' ? { backgroundColor: pickerState.value } : {}}
          aria-label={pickerState.type === 'color' ? `Selected color: ${pickerState.value}` : 'Selected emoji'}
        >
          {pickerState.type === 'color' ? (
            <div className="w-full h-full rounded-md" />
          ) : (
            <img src={pickerState.value} alt="Selected emoji" width={40} height={40} />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[264px] p-1 bg-white rounded-md shadow-lg"
          sideOffset={5}
        >
          <div className="flex mb-2 border-b">
            <button
              className={`flex-1 p-2 text-sm font-medium ${activeTab === 'color' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('color')}
            >
              Colors
            </button>
            <button
              className={`flex-1 p-2 text-sm font-medium ${activeTab === 'emoji' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('emoji')}
            >
              Emojis
            </button>
          </div>
          {activeTab === 'color' ? (
            <div className="grid grid-cols-6 gap-1">
              {colors.map((color) => {
                const isSelected = pickerState.type === 'color' && pickerState.value === color
                const buttonContrastColor = getContrastColor(color)
                return (
                  <button
                    key={color}
                    className={`w-10 h-10 p-0 border ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500' : 'border-transparent'}`}
                    style={{
                      backgroundColor: color,
                      color: buttonContrastColor,
                    }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={`Select color ${color}`}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="h-[320px] overflow-hidden">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                width="100%"
                height="100%"
                previewConfig={{ showPreview: false }}
                skinTonesDisabled
                searchDisabled
                emojiStyle={EmojiStyle.TWITTER}
              />
            </div>
          )}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
