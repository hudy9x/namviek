'use client';

import { useEffect } from 'react';
import ProjectNav from './ProjectNav';
import { getProjectMember } from 'packages/ui-app/services/projectMember';
import { useParams } from "next/navigation";

export default function ProjectContainer() {
  const params = useParams()

  useEffect(() => {
    console.log('aaa', params)
    // console.log('12897')
    getProjectMember(params.projectId).then(res => {
      console.log(res)
    })
  }, [])
	return <ProjectNav />;
}
