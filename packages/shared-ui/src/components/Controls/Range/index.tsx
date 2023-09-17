import * as Slider from '@radix-ui/react-slider'
import './styles.css'
import { RangerSlider } from '../type'

export default function RangerSlider({
  onChange,
  value,
  title,
  helper,
  error,
  disabled,
  required,
  readOnly,
  maxValue = 100,
  step = 10
}: RangerSlider) {
  const classes = ['form-control input-range']

  const onRangerSliderChange = (value: number[]) => {
    onChange && onChange(value[0])
  }

  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  error && classes.push('error')

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="flex relative">
        <Slider.Root
          className="slider-root"
          value={value ? [Number(value)] : [0]}
          max={maxValue}
          step={step}
          onValueChange={value => onRangerSliderChange(value)}>
          <Slider.Track className="slider-track">
            <Slider.Range className="slider-range" />
          </Slider.Track>
          <Slider.Thumb className="slider-thumb" aria-label="Volume" />
        </Slider.Root>
        <div className="slider-value" style={{ left: `${value}%` }}>
          {value}
        </div>
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
