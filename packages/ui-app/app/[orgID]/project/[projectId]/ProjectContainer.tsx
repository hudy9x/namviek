'use client';

import { HiOutlineCog6Tooth, HiOutlineUserCircle, HiOutlineViewColumns, HiOutlineCalendar } from 'react-icons/hi2';
import { useProjectStore } from '../../../../store/project';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import ProjectTabContent from './ProjectTabContent';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

export default function ProjectContainer() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = useParams();
  const { selectedProject } = useProjectStore(state => state);
  const mode = searchParams.get('mode');

  console.log('109238')

  const [tabs] = useState([
    { name: 'Overview', href: '#', icon: HiOutlineUserCircle, current: false },
    { name: 'Task', href: '#', icon: HiOutlineMenuAlt1, current: false },
    { name: 'Board', href: '#', icon: HiOutlineViewColumns, current: false },
    { name: 'Calendar', href: '#', icon: HiOutlineCalendar, current: false },
    { name: 'Setting', href: '#', icon: HiOutlineCog6Tooth, current: false }
  ]);

  const onMoveTab = (name: string) => {
    console.log(params);
    push(`${params.orgID}/project/${params.projectId}?mode=${name.toLowerCase()}`);
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold px-4 py-2">{selectedProject?.name}</h2>
        <div className="tab pl-1">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const active = tab.name.toLowerCase() === mode;
            return (
              <div onClick={() => onMoveTab(tab.name)} className={`tab-item ${active ? 'active' : ''}`} key={index}>
                <Icon />
                <span>{tab.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="task bg-indigo-50/50 w-full">
        <ProjectTabContent />
      </div>
    </div>
  );
}
