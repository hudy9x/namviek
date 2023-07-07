'use client';

import { useEffect } from 'react';
import { useProjectStatusStore } from '../../../../../store/status';
import { taskGetAll } from '../../../../../services/task';
import { useParams } from 'next/navigation';

export default function ListMode() {
  const { projectId } = useParams();
  const { statuses } = useProjectStatusStore();
  console.log('statuses:', statuses);

  useEffect(() => {
    console.log('called')
    taskGetAll(projectId).then(res => {
      const { data, status } = res.data;
      console.log(data);
    }).catch(err => {
        console.log(err)
      });
  }, []);

  return (
    <div>
      {statuses.map(stt => {
        return (
          <div key={stt.id}>
            {stt.name} - prject: ${stt.projectId}
          </div>
        );
      })}
    </div>
  );
}
