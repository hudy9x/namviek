import { LoadingSpinnerIcon } from './Icon'
import { ILoadingProps } from './LoadingContainer'

const AbsoluteLoading = ({
  enabled = true,
  title = 'Loading...',
  icon,
  size = 'base',
  className = '',
  border = false
}: ILoadingProps) => {
  if (!enabled) return null
  const loadingBorder = border ? 'loading-border' : ''

  return (
    <div className={`loading-absolute  ${className}`}>
      <div className={`loading-icon-container ${loadingBorder}`}>
        <div className={`loading-icon ${size} ${className}`}>
          {icon || <LoadingSpinnerIcon />}
        </div>
        {title && <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>}
      </div>
    </div>
  )
}

export default AbsoluteLoading
