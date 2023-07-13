import { randomId } from '@shared/ui';
import { useParams } from 'next/navigation';
import { projectStatusAdd, projectStatusUpdate } from '../../../../../../services/status';
import { useTaskStatusStore } from '../../../../../../store/taskStatus';
import { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { TaskStatus } from '@prisma/client';
import { ItemStatus } from './ItemStatus';
import { DEFAULT_COLOR } from './type';

export const ProjectStatus = () => {
  const params = useParams();
  const [name, setName] = useState<string>('');

  const { taskStatus, projectStatusAddStore, projectUpdateAllStatus, projectUpdateStatusStore } = useTaskStatusStore();

  
  const handleCreateStatus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;
    
    if (!name) {
      console.error('Invalid input');
      return;
    }
    
    const projectId = params.projectId;
    const fakeId = randomId();
    const order = taskStatus.length || 0;
    const newTaskStatus: TaskStatus = {
      id: fakeId,
      name,
      color: DEFAULT_COLOR,
      order,
      projectId
    };
    projectStatusAddStore(newTaskStatus);

    projectStatusAdd(newTaskStatus)
      .then(res => {
        const { status, data } = res.data;
        if (status !== 200) {
          return;
        }
        projectUpdateStatusStore(fakeId, data);
      })
      .catch(err => {
        console.log(`Create task status`, err);
      });
  };

  const handleChangeStatusName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const moveItem = async (dragIndex: number, hoverIndex: number) => {
    const draggedItem = taskStatus[dragIndex]; 
    taskStatus.splice(dragIndex, 1);
    taskStatus.splice(hoverIndex, 0, draggedItem);
    taskStatus[dragIndex] = {
      ...taskStatus[dragIndex],
      order: dragIndex
    };
    taskStatus[hoverIndex] = {
      ...taskStatus[hoverIndex],
      order: hoverIndex
    };

    projectUpdateAllStatus(taskStatus);

    try {
      await projectStatusUpdate(taskStatus[dragIndex]);
      await projectStatusUpdate(taskStatus[hoverIndex]);
    } catch (error) {
      console.log(error, `Update oder ${error}`);
    }
  };

  return (
    <div className="w-full ml-7">
      <h3 className="font-semibold"> Status Setting </h3>
      <div className="status-container">
        <div>
          {taskStatus.map((status, index) => (
            <ItemStatus status={status} index={index} moveItem={moveItem} />
          ))}
        </div>
        <div className="p-3 flex justify-between border-t-2" onKeyDown={handleCreateStatus}>
          <input className="outline-none input-status" placeholder="Create status" onChange={handleChangeStatusName} />
        </div>
      </div>
    </div>
  );
};
