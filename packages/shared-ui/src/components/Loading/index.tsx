import { createRoot } from 'react-dom/client'
import Loading from './LoadingContainer'
import { SetFixLoading } from './type'

const createLoadingContainer = () => {
  const wrapper = document.createElement('div')
  wrapper.id = 'loading-wrapper'
  document.body.appendChild(wrapper)

  return wrapper
}

export const setFixLoading: SetFixLoading = (
  enabled,
  { title, icon, className, border } = {}
) => {
  const loadingWrapper = document.querySelector('#loading-wrapper')
  if (!loadingWrapper) {
    const container = createLoadingContainer()
    const root = createRoot(container)

    root.render(<Loading {...{ enabled, title , icon, className, border }} />)
  }

  enabled
    ? loadingWrapper?.classList.remove('loading-hidden')
    : loadingWrapper?.classList.add('loading-hidden')
}
