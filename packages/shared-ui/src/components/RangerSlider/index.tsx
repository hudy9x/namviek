import { useEffect, useState } from 'react'
import * as Slider from '@radix-ui/react-slider'
import './styles.css'

export interface IRangerSlider {
  title?: string
  value: number
  onChange?: (v: number[]) => void
  defaultValue?: number[]
  maxValue?: number
  step?: number
}

export default function RangerSlider({
  onChange,
  value,
  title,
  defaultValue = [50],
  maxValue = 100,
  step = 10
}: IRangerSlider) {
  const onRangerSliderChange = (value: number[]) => {
    onChange && onChange(value)
  }

  return (
    <div className={'form-control'}>
      {title ? <label>{title}</label> : null}
      <div className='flex'>
        <div className='pr-2' >{value}</div>
        <Slider.Root
          className="SliderRoot"
          defaultValue={defaultValue}
          value={[value]}
          max={maxValue}
          step={step}
          onValueChange={value => onRangerSliderChange(value)}>
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
      </div>
    </div>
  )
}
