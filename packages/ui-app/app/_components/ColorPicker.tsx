'use client'

import { Popover } from '@shared/ui'
import * as React from 'react'

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

export default function ColorPicker({ color, onChange }:
  { color?: string, onChange?: (val: string) => void }) {
  const [selectedColor, setSelectedColor] = React.useState(color || '#f9fafb')
  const [isOpen, setIsOpen] = React.useState(false)

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setIsOpen(false)
    onChange && onChange(color)
  }

  const contrastColor = getContrastColor(selectedColor)

  return (
    <>
      <Popover
        triggerBy={
          <div
            style={{ backgroundColor: selectedColor, color: contrastColor }}
            className="border w-6 h-6 shrink-0 rounded cursor-pointer hover:opacity-90"></div>
        }
        content={
          <div className="grid grid-cols-6 gap-1 p-1.5 bg-white border rounded-md">
            {colors.map((color) => {
              const isSelected = color === selectedColor
              const buttonContrastColor = getContrastColor(color)
              return (
                <div
                  key={color}
                  className={`w-6 h-6 p-0 cursor-pointer ${isSelected ? 'ring-2 ring-offset-2' : ''}`}
                  style={{
                    backgroundColor: color,
                    color: buttonContrastColor,
                    borderColor: isSelected ? buttonContrastColor : 'transparent'
                  }}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`Select color ${color}`}
                >
                  <span className="sr-only">{color}</span>
                </div>
              )
            })}
          </div>
        }
      />
    </>
  )
}

