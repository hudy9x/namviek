import { ReactNode } from 'react'
import AbsoluteLoading from './AbsoluteLoading'
import { LoadingSpinnerIcon } from './Icon'
import './style.css'
export interface ILoadingProps {
  title?: string
  icon?: ReactNode
  size?: 'base' | 'sm' | 'lg'
  spinnerSpeed?: 'normal' | 'fast' | 'vfast'
  className?: string
  enabled?: boolean
  border?: boolean
}

const LoadingContainer = ({
  enabled = true,
  title,
  icon,
  size = 'base',
  className = '',
  spinnerSpeed,
  border = false
}: ILoadingProps) => {
  if (!enabled) return null
  const loadingBorder = border ? 'loading-border' : ''

  return (
    <div className={`loading-icon-container ${className} ${loadingBorder}`}>
      <div className={`loading-icon ${size}`}>
        {icon || <LoadingSpinnerIcon speed={spinnerSpeed} />}
      </div>
      {title && (
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      )}
    </div>
  )
}

LoadingContainer.Absolute = AbsoluteLoading

export default LoadingContainer
