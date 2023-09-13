import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import './styles.css';

export interface IRangerSlider {
  title?: string,
  value: number,
  onChange?: (v: number[]) => void;
}

export default function RangerSlider({
  onChange,
  value,
  title,
}: IRangerSlider) {
  const [val, setVal] = useState<number[]>([50])

  useEffect(() => {
    setVal([value])
  }, [value])

  const onRangerSliderChange = (value: number[]) => {
    onChange && onChange(value)
  }

  return (
    <div>
      {title ? <label>{title}</label> : null}
      <div>
        <Slider.Root className="SliderRoot" defaultValue={[50]} value={val} max={100} step={1} onValueChange={value => onRangerSliderChange(value)}>
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
      </div>
    </div>
  )
}
