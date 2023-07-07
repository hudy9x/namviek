'use client';

import { useSearchParams } from 'next/navigation';
import TaskList from './TaskList';
import { Setting } from './settings/layout';

export default function ProjectTabContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode')
  return (
    <div className="project-tab-content" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'task' ? <TaskList /> : searchParams}
      {mode === 'setting' ? <Setting /> : searchParams}
    </div>
  );
}
