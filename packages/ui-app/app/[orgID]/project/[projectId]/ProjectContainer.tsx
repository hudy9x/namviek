'use client';

import { useEffect } from 'react';
import ProjectNav from './ProjectNav';
import { getProjectMember } from '../../../../services/member';
import { useParams } from 'next/navigation';
import { useMemberStore } from '../../../../store/member';

export default function ProjectContainer() {
  const params = useParams();
  const { addAllMember } = useMemberStore();

  useEffect(() => {
    getProjectMember(params.projectId).then(res => {
      const { data, status } = res.data;
      if (status !== 200) {
        addAllMember([]);
        return;
      }

      addAllMember(data);
    });
  }, []);
  return <ProjectNav />;
}
