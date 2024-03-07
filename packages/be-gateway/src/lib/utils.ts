export const isDevMode = () => {
  return process.env.DEV_MODE === 'true'
}

export const isProdMode = () => {
  return !isDevMode()
}
