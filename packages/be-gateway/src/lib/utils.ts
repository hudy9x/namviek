export const isDevMode = () => {
  return process.env.DEV_MODE
}

export const isEmailVerificationEnabled = () => {
  const isEnabled = process.env.EMAIL_VERIFICATION_ENABLED
  console.log('isEnabled', isEnabled)
  return isEnabled === '1' || isEnabled === 'true'
}

export const isProdMode = () => {
  return !isDevMode()
}
