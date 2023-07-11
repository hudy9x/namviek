'use client';

import { useEffect } from 'react';
import { useProjectStatusStore } from '../../../../../store/status';
import { taskGetAll } from '../../../../../services/task';
import { useParams } from 'next/navigation';
import { messageError } from '@shared/ui';
import { useTaskStore } from '../../../../../store/task';
import StatusItem from '../../../../_components/StatusItem';
import { format } from 'date-fns';
import TaskCheckbox from '../../../../_components/TaskCheckbox';
import TaskCheckAll from './TaskCheckAll';
import TaskAssignee from './TaskAssignee';
import TaskDate from './TaskDate';

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
    <div className="pb-[100px]">
      {statuses.map(stt => {
        return (
          <div className="bg-white mb-4 rounded-md border mx-4 relative mt-4" key={stt.id}>
            <div className="px-3 py-2 border-b sticky top-0 bg-white rounded-t-md flex items-center justify-between z-10">
              <div style={{ color: stt.color }} className="flex gap-2 items-center text-xs uppercase font-bold">
                <TaskCheckAll />
                {stt.name}
              </div>
              <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
                <div>Assignee</div>
                <div>Priority</div>
                <div>Point</div>
                <div>Duedate</div>
                <div>Created by</div>
              </div>
            </div>
            <div className="divide-y">
              {tasks.map(task => {
                if (task.taskStatusId !== stt.id) return null;
                const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                return (
                  <div className="px-3 py-2 text-sm flex items-center justify-between" key={task.id}>
                    <div className="flex items-center gap-2">
                      <TaskCheckbox id={stt.id} />
                      <StatusItem id={stt.id} />
                      {task.title}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <div>
                        <TaskAssignee taskId={task.id} uids={task.assigneeIds} />
                      </div>
                      <div>{task.priority ? task.priority : '-'}</div>
                      <div>{task.taskPoint ? task.taskPoint : '-'}</div>
                      <div>
                        <TaskDate taskId={task.id} date={task.dueDate ? new Date(task.dueDate) : null} />
                      </div>
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
