'use client';

import { useSearchParams } from 'next/navigation';
import TaskList from './TaskList';

export default function ProjectTabContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className="project-tab-content overflow-y-auto" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'task' ? <TaskList /> : searchParams}
    </div>
  );
}
