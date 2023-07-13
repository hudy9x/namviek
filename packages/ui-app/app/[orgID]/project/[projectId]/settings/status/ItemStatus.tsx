import { TaskStatus } from '@prisma/client';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { OutsideClickHandler } from '@shared/ui';
import { projectStatusDel, projectStatusUpdate } from 'packages/ui-app/services/status';
import { useTaskStatusStore } from 'packages/ui-app/store/taskStatus';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { HiOutlineBars4 } from 'react-icons/hi2';
import { Popover } from 'packages/shared-ui/src/components/Controls';
import { DEFAULT_COLOR, IActionVisibility, IEditStatus, colors } from './type';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

interface IItemStatus {
  status: TaskStatus;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const ItemStatus = ({ status, index, moveItem }: IItemStatus) => {
  const { projectUpdateStatusStore, projectStatusDelStore } = useTaskStatusStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    updateColor: {} as IEditStatus,
    updateName: {} as IEditStatus,
    colorBoxVisible: {} as IActionVisibility,
    actionVisible: {} as IActionVisibility,
    actionEditName: {} as IActionVisibility
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'Test',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY! < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY! > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
   type: "Test",
   item: () => {
     const id = status.id
     return { id, index }
   },
   collect: (monitor) => ({
     isDragging: monitor.isDragging()
   })
 });

  const handleDelete = async (status: TaskStatus) => {
    const { id } = status;

    projectStatusDelStore(id);
    await projectStatusDel(id);
  };

  const handleActionVisible = (keyMouse: string, id: string) => {
    if (keyMouse === 'enter') {
      setState(prev => ({
        ...prev,
        actionVisible: { [id]: true }
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      actionVisible: { [id]: false }
    }));
  };

  const handleUpdateStatus = async (e: KeyboardEvent<HTMLDivElement>, status: TaskStatus, index: number) => {
    if (state.actionEditName && e.key === 'Enter') {
      const id = status.id;
      const data = {
        id: status.id,
        name: state.updateName[id],
        color: state.updateColor[id],
        order: index
      };
      projectUpdateStatusStore(data.id, data);
      await projectStatusUpdate(data);

      setState(prev => ({
        ...prev,
        colorBoxVisible: { [id]: false },
        actionEditName: { [id]: false }
      }));
    }
  };

  useEffect(() => {
    if (state.actionEditName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.actionEditName]);

  drag(drop(ref));
  
  return (
    <div
      data-handler-id={handlerId}
      key={status.id}
      ref={ref}
      className="flex justify-between p-3 border-b-2"
      onKeyDown={e => handleUpdateStatus(e, status, index)}
      onMouseEnter={() => handleActionVisible('enter', status.id)}
      onMouseLeave={() => handleActionVisible('leave', status.id)}>
      <div className="flex items-center">
        <div className="text-xl mr-2 text-gray-500 cursor-grabbing">
          <HiOutlineBars4 />
        </div>
        <Popover
          triggerBy={
            <div
              style={{
                backgroundColor: state.updateColor[status.id] ? state.updateColor[status.id] : status.color || DEFAULT_COLOR
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
                    onClick={() =>
                      setState(prev => ({
                        ...prev,
                        updateColor: {
                          [status.id]: color
                        }
                      }))
                    }
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
            onChange={e =>
              setState(prev => ({
                ...prev,
                updateName: {
                  ...prev.updateName,
                  [status.id]: e.target.value
                }
              }))
            }
            value={state.updateName[status.id]}
          />
        ) : (
          <div className="mr-2 text-gray-500">{status.name}</div>
        )}
      </div>
      {state.actionVisible[status.id] ? (
        <div className="flex items-center">
          <AiOutlineDelete onClick={() => handleDelete(status)} className="mr-2" />
          <AiOutlineEdit
            onClick={() => setState(prev => ({ ...prev, actionEditName: { [status.id]: !state.actionEditName[status.id] } }))}
          />
        </div>
      ) : null}
    </div>
  );
};
