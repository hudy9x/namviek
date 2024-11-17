'use client'

import { Button } from '@shared/ui'
import { usePagination } from './usePagination'

interface LoadMoreProps {
  onLoadMore: () => void
  isLoading?: boolean
  className?: string
}

export function LoadMore({ onLoadMore, isLoading = false, className = '' }: LoadMoreProps) {
  const { hasNextPage } = usePagination()

  if (!hasNextPage) return null

  return (
    <Button 
      onClick={onLoadMore}
      disabled={isLoading}
      className={className}
      title={isLoading ? 'Loading...' : 'Load More'}      
    />
  )
} 