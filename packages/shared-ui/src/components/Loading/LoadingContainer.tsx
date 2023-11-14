import { ReactNode } from 'react'
import { LoadingSpinnerIcon } from './Icon'
import './style.css'
import AbsoluteLoading from './AbsoluteLoading'
export interface ILoadingProps {
  title?: string
  icon?: ReactNode
  size?: 'base' | 'sm' | 'lg'
  className?: string
}

export interface ILoadingEnabled extends ILoadingProps {
  enabled?: boolean
}

const LoadingContainer = ({
  enabled = true,
  title,
  icon = true,
  size = 'base',
  className = ''
}: ILoadingEnabled) => {
  if (!enabled) return null

  return (
    <div className="loading-icon-container">
      <div className={`loading-icon ${size} ${className}`}>
        {typeof icon === 'boolean' ? icon && <LoadingSpinnerIcon /> : icon}
      </div>
      {title && <p className="text-gray-500 dark:text-gray-300">{title}</p>}
    </div>
  )
}

LoadingContainer.Absolute = AbsoluteLoading

export default LoadingContainer
