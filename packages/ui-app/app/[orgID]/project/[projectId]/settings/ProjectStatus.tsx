import { Button, randomId, OutsideClickHandler } from '@shared/ui';
import { useParams } from 'next/navigation';
import { Popover } from 'packages/shared-ui/src/components/Controls';
import { projectStatusAdd, projectStatusDel, projectStatusEdit } from '../../../../../services/status';
import { useTaskStatusStore } from '../../../../../store/taskStatus';
import { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { HiOutlineBars4 } from 'react-icons/hi2';
import { TaskStatus } from '@prisma/client';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
  'pink',
  'brown',
  'gray',
  'black',
  'white',
  'cyan',
  'magenta',
  'lime',
  'teal',
  'olive'
];

const DEFAULT_COLOR = 'white';

interface IActionVisibility {
  [key: string]: boolean;
}

interface IEditStatus {
  [key: string]: string;
}

export const ProjectStatus = () => {
  const params = useParams();
  const [name, setName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    projectStatusAddStore,
    taskStatusAll,
    projectStatusEditStore,
    projectStatusDelStore,
    projectStatusInitialStore,
    projectUpdateIdStatus
  } = useTaskStatusStore();
  const [state, setState] = useState({
    updateColor: {} as IEditStatus,
    updateName: {} as IEditStatus,
    colorBoxVisible: {} as IActionVisibility,
    actionVisible: {} as IActionVisibility,
    actionEditName: {} as IActionVisibility
  });

  const projectId = params.projectId;

  const handleCreateStatus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;
    const fakeId = randomId();
    const order = taskStatusAll[projectId].length || 0;
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
        console.log(data, 'data');
        projectUpdateIdStatus(fakeId, data.id, projectId);
      })
      .catch(err => {
        console.log(`Create task status`, err);
      });
  };

  const handleUpdateStatusName = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setState(prev => ({
      ...prev,
      updateName: {
        ...prev.updateName,
        [id]: e.target.value
      }
    }));
  };

  const handleChangeStatusName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleDelete = async (id: string) => {
    projectStatusDelStore(projectId, id);
    await projectStatusDel(id);
  };

  const handleUpdateStatus = async (e: KeyboardEvent<HTMLDivElement>, id: string, index: number) => {
    if (state.actionEditName && e.key === 'Enter') {
      const data = {
        id,
        name: state.updateName[id],
        color: state.updateColor[id],
        order: index
      };
      projectStatusEditStore(data, projectId);
      await projectStatusEdit(data);

      setState(prev => ({
        ...prev,
        colorBoxVisible: { [id]: false }
      }));
    }
  };

  const handleActionVisible = (keyMouse: string, id: string) => {
    if (keyMouse === 'enter') {
      setState(prev => ({
        ...prev,
        actionVisible: {
          [id]: true
        }
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      actionVisible: {
        [id]: false
      }
    }));
  };

  const handleChangeColor = (color: string, id: string) => {
    console.log(color, 'color');
    setState(prev => ({
      ...prev,
      updateColor: {
        ...prev.updateColor,
        [id]: color
      }
    }));
  };

  const handleOpenEditName = (id: string) => {
    setState(prev => ({
      ...prev,
      actionEditName: {
        ...prev.actionEditName,
        [id]: !state.actionEditName[id]
      }
    }));
  };

  useEffect(() => {
    // Create key-value status in store
    if (Object.prototype.hasOwnProperty.call(taskStatusAll, params.projectId)) {
      return;
    }
    projectStatusInitialStore(params.projectId);
  }, [params.projectId]);

  useEffect(() => {
    if (state.actionEditName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.actionEditName]);

  return (
    <div className="w-full ml-7">
      <h3 className="font-semibold"> Status Setting </h3>
      <div className="status-container">
        <div>
          {taskStatusAll[projectId] &&
            taskStatusAll[projectId].map((status, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border-b-2"
                onKeyDown={e => handleUpdateStatus(e, status.id, index)}
                onMouseEnter={() => handleActionVisible('enter', status.id)}
                onMouseLeave={() => handleActionVisible('leave', status.id)}>
                <div className="flex items-center">
                  <div className="text-xl mr-2 text-gray-500">
                    <HiOutlineBars4 />
                  </div>
                  <Popover
                    triggerBy={
                      <div
                        style={{
                          backgroundColor: state.updateColor[status.id]
                            ? state.updateColor[status.id]
                            : status.color || DEFAULT_COLOR
                        }}
                        className="color-container"></div>
                    }
                    content={
                      <OutsideClickHandler
                        onOutsideClick={() =>
                          setState(prev => ({
                            ...prev,
                            colorBoxVisible: { [status.id]: false }
                          }))
                        }>
                        <div className="color-list">
                          {colors.map((color, index) => (
                            <div
                              key={index}
                              style={{ backgroundColor: color }}
                              onClick={() => handleChangeColor(color, status.id)}
                              className="color-item m-1"></div>
                          ))}
                        </div>
                      </OutsideClickHandler>
                    }
                    visible={state.colorBoxVisible[status.id]}
                    onVisibleChange={() => setState(prev => ({ ...prev, colorBoxVisible: { [status.id]: true } }))}
                  />
                  {state.actionEditName[status.id] ? (
                    <input
                      ref={inputRef}
                      className="outline-none input-status"
                      onChange={e => handleUpdateStatusName(e, status.id)}
                      value={state.updateName[status.id]}
                    />
                  ) : (
                    <div className="mr-2 text-gray-500">{status.name}</div>
                  )}
                </div>
                {state.actionVisible[status.id] ? (
                  <div className="flex items-center">
                    <AiOutlineDelete onClick={() => handleDelete(status.id)} className="mr-2" />
                    <AiOutlineEdit onClick={() => handleOpenEditName(status.id)} />
                  </div>
                ) : null}
              </div>
            ))}
        </div>
        <div className="p-3 flex justify-between border-t-2" onKeyDown={e => handleCreateStatus(e)}>
          <input className="outline-none input-status" placeholder="Create status" onChange={handleChangeStatusName} />
        </div>
      </div>
    </div>
  );
};
