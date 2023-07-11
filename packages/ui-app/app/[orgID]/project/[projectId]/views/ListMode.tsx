'use client';

import { useEffect } from 'react';
import { useProjectStatusStore } from '../../../../../store/status';
import { taskGetAll } from '../../../../../services/task';
import { useParams } from 'next/navigation';
import { messageError } from '@shared/ui';
import { useTaskStore } from '../../../../../store/task';
import StatusItem from 'packages/ui-app/app/_components/StatusItem';

export default function ListMode() {
  const { projectId } = useParams();
  const { statuses } = useProjectStatusStore();
  const { tasks, addAllTasks } = useTaskStore();
  console.log('statuses:', statuses);

  useEffect(() => {
    console.log('called');
    taskGetAll(projectId)
      .then(res => {
        const { data, status, error } = res.data;
        if (status !== 200) {
          addAllTasks([]);
          messageError(error);
          return;
        }
        addAllTasks(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {statuses.map(stt => {
        return (
          <div className="bg-white mb-4 rounded-md border mx-4 relative mt-4" key={stt.id}>
            <div className="px-3 py-2 border-b sticky top-0 bg-white rounded-t-md flex items-center justify-between z-10">
              <span style={{ color: stt.color }} className="text-xs uppercase font-bold">
                {stt.name}
              </span>
              <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
                <div>Status</div>
                <div>Assignee</div>
                <div>Priority</div>
                <div>Point</div>
                <div>Date</div>
                <div>Created by</div>
              </div>
            </div>
            <div className="divide-y">
              {tasks.map(task => {
                if (task.taskStatusId !== stt.id) return null;
                return (
                  <div className="px-3 py-2 text-sm flex items-center justify-between" key={task.id}>
                    <span>{task.title}</span>
                    <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
                      <div>
                        <StatusItem id={stt.id} />
                      </div>
                      <div>Assignee</div>
                      <div>Priority</div>
                      <div>Point</div>
                      <div>Date</div>
                      <div>Created by</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
