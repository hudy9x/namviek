'use client';

import { useSearchParams } from 'next/navigation';
import TaskList from './TaskList';
import Settings from './settings';

export default function ProjectTabContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'task' && <TaskList />}
      {mode === 'setting' && <Settings />}
    </div>
  );
}
