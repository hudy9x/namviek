import { useState, useEffect, ChangeEvent, FocusEvent, useRef } from 'react'
import Addon from './Addon'
import InputIcon from './InputIcon'
import './style.css'
import { InputProps } from '../type'

export default function InputControl({
  title,
  value,
  onChange,
  onEnter,
  onBlur,
  onEsc,
  type = 'text',
  name,
  placeholder,
  helper,
  required,
  error,
  disabled,
  readOnly,
  focus = false,
  icon,
  addon,
  className
}: InputProps) {
  const classes = ['form-control']
  // const [val, setVal] = useState(value)
  const ref = useRef<HTMLInputElement>(null)

  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev)
  }

  const onInputBlur = (ev: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(ev)
  }

  // useEffect(() => {
  //   console.log(value)
  //   setVal(value)
  // }, [value])

  useEffect(() => {
    const inpRef = ref.current
    if (inpRef) {
      focus ? inpRef.focus() : inpRef.blur()
    }
  }, [focus])

  if (icon && addon) {
    throw new Error('Only accept lading icon or leading addon !')
  }

  icon && classes.push('leading-icon')
  disabled && classes.push('disabled')
  required && classes.push('required')
  readOnly && classes.push('readonly')
  addon && classes.push('addon')
  error && classes.push('error')
  className && classes.push(className)

  return (
    <div className={classes.join(' ')}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper">
        {icon ? <InputIcon source={icon} /> : null}
        {addon ? <Addon text={addon} /> : null}

        <input
          ref={ref}
          type={type}
          value={value}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onInputChange}
          onBlur={onBlur}
          onKeyUp={ev => {
            const target = ev.target as HTMLInputElement
            if (ev.key === 'Enter' && !ev.shiftKey) {
              onEnter && onEnter(target.value, target)
            }

            if (ev.key === 'Escape') {
              onEsc && onEsc(target)
            }
          }}
          placeholder={placeholder}
          className="form-input"
        />
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  )
}
