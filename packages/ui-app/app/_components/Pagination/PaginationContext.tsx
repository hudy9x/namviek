import { createContext, ReactNode, useState } from 'react';

interface PaginationContextType {
  nextCursor: string | null;
  setNextCursor: (cursor: string | null) => void;
}

export const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  return (
    <PaginationContext.Provider value={{ 
      nextCursor, 
      setNextCursor 
    }}>
      {children}
    </PaginationContext.Provider>
  );
} 