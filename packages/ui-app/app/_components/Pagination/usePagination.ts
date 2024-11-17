import { useContext, useMemo } from 'react';
import { PaginationContext } from './PaginationContext';

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }

  // Return memoized value to prevent unnecessary re-renders
  return useMemo(() => ({
    nextCursor: context.nextCursor,
    hasNextPage: context.nextCursor !== null,
    setNextCursor: (cursor: string | null) => {
      // Only update if value actually changed
      if (context.nextCursor !== cursor) {
        context.setNextCursor(cursor);
      }
    }
  }), [context.nextCursor, context.setNextCursor]);
}