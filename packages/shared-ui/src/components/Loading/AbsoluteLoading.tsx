import { LoadingSpinnerIcon } from './Icon'
import { ILoadingProps } from './LoadingContainer'

const AbsoluteLoading = ({
  title = 'Loading...',
  icon = true,
  size = 'base',
  className = ''
}: ILoadingProps) => {
  return (
    <div className="loading-absolute loading-icon-container">
      <div className={`loading-icon ${size} ${className}`}>
        {typeof icon === 'boolean' ? icon && <LoadingSpinnerIcon /> : icon}
      </div>
      {title && <p className="text-gray-500 dark:text-gray-300">{title}</p>}
    </div>
  )
}

export default AbsoluteLoading
