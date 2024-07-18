'use client'
import { useEffect } from "react"

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in window.navigator) {
      window.navigator.serviceWorker
        .register('/sw-cache-resources.js')
        .then(registration => console.log('Scope is:', registration, registration.scope))
    }
  })
  return <></>
}
