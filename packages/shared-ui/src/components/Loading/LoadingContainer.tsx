import React from 'react'
import { LoadingSpinnerIcon } from './Icon'
import './style.css'
export interface ILoadingProps {
  title?: string
  icon?: React.ReactNode
  size?: 'default' | 'small' | 'large'
  className?: string
}

export interface ILoadingEnabled extends ILoadingProps {
  enabled?: boolean
}

const LoadingContainer = ({
  enabled = true,
  title,
  icon = true,
  size = 'default',
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

LoadingContainer.Absolute = ({
  title = 'Loading...',
  icon = true,
  size = 'default',
  className = ''
}) => {
  return (
    <div className="loading-absolute loading-icon-container">
      <div className={`loading-icon ${size} ${className}`}>
        {typeof icon === 'boolean' ? icon && <LoadingSpinnerIcon /> : icon}
      </div>
      {title && <p className="text-gray-500 dark:text-gray-300">{title}</p>}
    </div>
  )
}

export default LoadingContainer
