import { ChangeEvent, useEffect, useState } from "react";
import { TextareaProps } from "../type";

export default function TextareaControl({
  title, value, name,
  onChange, placeholder,
  helper, error,
  required, disabled, readOnly,
  rows = 4, cols,
}: TextareaProps) {
  const classes = ["form-control"]
  const [val, setValue] = useState(value)

  const onInputChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(ev)
  }

  useEffect(() => {
    setValue(value)
  }, [value])

  disabled && classes.push("disabled")
  required && classes.push("required")
  readOnly && classes.push("readonly")
  error && classes.push("error")

  return <div className={classes.join(" ")}>
    {title ? <label>{title}</label> : null}
    <div className="relative form-control-wrapper inline-flex w-full">
      <textarea
        value={val}
        name={name}
        cols={cols}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onInputChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
    {helper && !error ? <p className="mt-2 text-sm text-gray-500">{helper}</p> : null}
    {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
  </div>
}
