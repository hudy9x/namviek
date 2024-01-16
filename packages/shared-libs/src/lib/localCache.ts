export enum LCK {
  RECENT_VISIT = 'RECENT_VISIT',
  PROJECT_BADGE = 'PROJECT_BADGE'
}
export const setLocalCache = (name: LCK | string, value: string) => {
  localStorage.setItem(name, value)
}

export const setLocalJSONCache = (name: LCK | string, value: string) => {
  try {
    localStorage.setItem(name, JSON.stringify(value))
  } catch (error) {
    console.log(error)
  }
}

export const getLocalCache = (name: LCK | string) => {
  return localStorage.getItem(name)
}

export const getLocalJSONCache = (name: LCK | string) => {
  try {
    const data = localStorage.getItem(name)
    if (!data) return null

    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

// cache recent visit

export const setRecentVist = (value: string) => {
  localStorage.setItem(LCK.RECENT_VISIT, value)
}

export const getRecentVisit = () => {
  return localStorage.getItem(LCK.RECENT_VISIT)
}
