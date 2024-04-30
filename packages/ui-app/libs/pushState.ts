type PushStateCallbackFn = null | ((url: string) => void)
const pushStateFns: PushStateCallbackFn[] = []

export const onPushStateRun = (fn: (url: string) => void) => {
  const pushStateIndex = pushStateFns.push(fn)

  return () => {
    pushStateFns[pushStateIndex] = null
  }

}

const callPushStateFns = (url: string) => {
  setTimeout(() => {
    pushStateFns.forEach(fn => {
      if (!fn) return
      fn(url)
    })
  }, 150);
}


export const pushState = (name: string, value: string) => {
  const location = window.location.toString()
  const url = new URL(location)
  url.searchParams.set(name, value)

  window.history.pushState({}, "", url)
  callPushStateFns(url.toString())
}

export const deleteState = (name: string) => {
  const location = window.location.toString()
  const url = new URL(location)
  url.searchParams.delete(name)

  window.history.pushState({}, "", url)
  callPushStateFns(url.toString())

}
