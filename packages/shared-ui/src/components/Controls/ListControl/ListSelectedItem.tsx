import { ReactNode } from 'react';

export default function ListSelectedItem({ children }: { children: ReactNode }) {
  return <div className="selected-item">{children}</div>;
}
