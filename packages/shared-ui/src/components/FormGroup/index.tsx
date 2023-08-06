import { ReactNode } from 'react'
import './style.css'

interface IFormGroupProps {
  title?: string
  children: ReactNode
}
export default function FormGroup({ title, children }: IFormGroupProps) {
  return (
    <div className="form-control-group form-control">
      {title ? <label>{title}</label> : null}
      <div className="flex items-center form-group">{children}</div>
    </div>
  )
}
