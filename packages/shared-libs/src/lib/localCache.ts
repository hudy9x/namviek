export enum LCK {
  RECENT_VISIT = 'RECENT_VISIT'
}
export const setLocalCache = (name: LCK, value: string) => {
  localStorage.setItem(name, value)
}

export const getLocalCache = (name: LCK) => {
  return localStorage.getItem(name)
}

export const setRecentVist = (value: string) => {
  localStorage.setItem(LCK.RECENT_VISIT, value)
}

export const getRecentVisit = () => {
  return localStorage.getItem(LCK.RECENT_VISIT)
}
