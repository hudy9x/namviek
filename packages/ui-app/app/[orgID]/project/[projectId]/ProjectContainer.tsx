'use client';

import { useEffect } from 'react';
import ProjectNav from './ProjectNav';
import { getProjectMember } from '../../../../services/member';
import { useParams } from 'next/navigation';
import { useMemberStore } from '../../../../store/member';
import { useTaskStatusStore } from '../../../../store/taskStatus';

export default function ProjectContainer() {
  const params = useParams();
  const { addAllMember } = useMemberStore();
  const { taskStatusAll, projectStatusInitialStore } = useTaskStatusStore();

  useEffect(() => {
    getProjectMember(params.projectId).then(res => {
      const { data, status } = res.data;
      if (status !== 200) {
        addAllMember([]);
        return;
      }

      addAllMember(data);
    });

    // Create key-value status in store
    if (taskStatusAll.hasOwnProperty(params.projectId)) {
      return
    }
    projectStatusInitialStore(params.projectId)
  }, []);

  return <ProjectNav />;
}
