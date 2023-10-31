const frontendUrl = process.env.NEXT_PUBLIC_FE_GATEWAY.replace(/\/*$/, '')

const _clean = (url: string) => {
  return url.replace(/^\/*/, '')
}

export const genFrontendUrl = (url: string) => {
  return `${frontendUrl}/${_clean(url)}`
}

export const getLogoUrl = () => {
  return genFrontendUrl(`/logo71x71.png`)
}
