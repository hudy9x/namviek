import { Loading } from '@ui-components'
import { HTMLAttributes } from 'react'
import './index.css'

type ButtonBaseAttrs = HTMLAttributes<HTMLButtonElement>
type ButtonBaseAttrsFilter = Pick<
  ButtonBaseAttrs,
  | 'onMouseUp'
  | 'onMouseDown'
  | 'onClick'
  | 'onSubmit'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onKeyDown'
>

interface IButtonProps {
  title?: string
  primary?: boolean
  danger?: boolean
  ghost?: boolean
  warn?: boolean
  leadingIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  className?: string
  block?: boolean
  size?: 'sm' | 'md' | 'base' | 'lg'
  type?: 'button' | 'reset' | 'submit'
}

type ButtonPropsWithoutDuplicate = Omit<
  ButtonBaseAttrsFilter,
  keyof IButtonProps
>

type ButtonProps = IButtonProps & ButtonPropsWithoutDuplicate

const Button = ({
  title,
  primary,
  danger,
  warn,
  ghost,
  block,
  size = 'base',
  type = 'button',
  leadingIcon,
  loading,
  disabled,
  className,
  ...otherProps
}: ButtonProps) => {
  const classes = [
    'btn',
    leadingIcon && 'has-leading-icon',
    ghost && 'btn-ghost',
    primary && 'btn-primary',
    danger && 'btn-danger',
    warn && 'btn-warning',
    block && 'block',
    title ? '' : 'notitle',
    size,
    className
  ].filter(Boolean)

  return (
    <button
      type={type}
      className={classes.join(' ')}
      disabled={disabled}
      {...otherProps}>
      {leadingIcon && !loading ? leadingIcon : null}
      {loading ? <Loading /> : null}
      {title}
    </button>
  )
}

export default Button
