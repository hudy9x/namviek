import { createContext, useContext, ReactNode, useState } from 'react'
import { ListItemValue } from '@ui-components'

interface ConnectorCache {
  [key: string]: {
    data: ListItemValue[]
    timestamp: number
  }
}

interface ConnectorCacheContextType {
  getCache: (key: string) => ListItemValue[] | null
  setCache: (key: string, data: ListItemValue[]) => void
  getPendingRequest: (key: string) => Promise<any> | null
  setPendingRequest: (key: string, promise: Promise<any>) => void
  deletePendingRequest: (key: string) => void
}

const ConnectorCacheContext = createContext<ConnectorCacheContextType | null>(null)

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Shared pending requests map
const pendingRequests = new Map<string, Promise<any>>()

export function ConnectorCacheProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<ConnectorCache>({})

  const getCache = (key: string) => {
    const cached = cache[key]
    if (!cached) return null

    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      const newCache = { ...cache }
      delete newCache[key]
      setCache(newCache)
      return null
    }

    return cached.data
  }

  const setCacheValue = (key: string, data: ListItemValue[]) => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }))
  }

  const getPendingRequest = (key: string) => {
    return pendingRequests.get(key) || null
  }

  const setPendingRequest = (key: string, promise: Promise<any>) => {
    pendingRequests.set(key, promise)
  }

  const deletePendingRequest = (key: string) => {
    pendingRequests.delete(key)
  }

  return (
    <ConnectorCacheContext.Provider value={{ 
      getCache, 
      setCache: setCacheValue,
      getPendingRequest,
      setPendingRequest,
      deletePendingRequest
    }}>
      {children}
    </ConnectorCacheContext.Provider>
  )
}

export function useConnectorCache() {
  const context = useContext(ConnectorCacheContext)
  if (!context) {
    throw new Error('useConnectorCache must be used within a ConnectorCacheProvider')
  }
  return context
} 