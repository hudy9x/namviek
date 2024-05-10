export const isDevMode = () => {
  return process.env.DEV_MODE
}

export const isProdMode = () => {
  return !isDevMode()
}
