import { ReactNode } from 'react'
import AbsoluteLoading from './AbsoluteLoading'
import { LoadingSpinnerIcon } from './Icon'
import './style.css'
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
  icon,
  size = 'base',
  className = ''
}: ILoadingEnabled) => {
  if (!enabled) return null

  return (
    <div className={`loading-icon-container ${className}`}>
      <div className={`loading-icon ${size}`}>
        {icon || <LoadingSpinnerIcon />}
      </div>
      {title && <p className="text-gray-500 dark:text-gray-300">{title}</p>}
    </div>
  )
}

LoadingContainer.Absolute = AbsoluteLoading

export default LoadingContainer
