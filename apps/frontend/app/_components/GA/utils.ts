
export enum GAAction {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  NONE = 'none'
}

export enum GACategory {
  NONE = 'none',
  AUTHEN = 'authentication'
}

interface ITrackingParams {
  action: GAAction,
  category?: GACategory
  label?: string
  value: unknown
}

export const trackingEvent = ({ action, category = GACategory.NONE, label = '', value = '' }: ITrackingParams) => {
  try {
    if (action === GAAction.SIGN_IN) {
      label = 'User signed in'
    }

    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value
    })
  } catch (error) {
    console.log('sending track event error:', error)

  }

}
