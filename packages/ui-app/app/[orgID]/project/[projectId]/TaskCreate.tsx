import { Button, Modal } from '@shared/ui';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import TaskForm from './TaskForm';

export default function TaskCreate() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add a new task"
        triggerBy={
          <div>
            <Button
              primary
              leadingIcon={<AiOutlinePlus />}
              title="Create task"
              className="fixed-craete-btn absolute bottom-10 right-10 z-[11] "
            />
          </div>
        }
        content={
          <>
            <TaskForm
              onSuccess={() => {
                setVisible(false);
              }}
            />
          </>
        }
      />
    </div>
  );
}
