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
  const classes = ['form-control']

  const onRangerSliderChange = (value: number[]) => {
    onChange && onChange(value)
  }

  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  error && classes.push('error')

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="flex">
        <div className="pr-2">{value}</div>
        <Slider.Root
          className="SliderRoot"
          value={value ? [Number(value)] : [0]}
          max={maxValue}
          step={step}
          onValueChange={value => onRangerSliderChange(value)}>
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
