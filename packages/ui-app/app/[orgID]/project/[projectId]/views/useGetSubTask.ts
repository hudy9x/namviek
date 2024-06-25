import { useContext, useEffect } from 'react'
import { ITaskQuery, taskGetSubTask } from '@/services/task'
import { SubTaskContext } from '@/features/SubTask/context';

export const useGetSubTasks = ({ parentTaskId, projectId, taskDetailId }: { parentTaskId?: string, taskDetailId?: string, projectId: string }) => {
  const { setSubTasks, isOpen, setLoading } = useContext(SubTaskContext)

  useEffect(() => {
    const fetchSubTasks = async () => {
      const id = parentTaskId || taskDetailId
      try {
        const query: ITaskQuery = {
          parentTaskId: id,
          projectId,
        };
        const response = await taskGetSubTask(query);
        const listSubTask = response.data;
        if (listSubTask && listSubTask.data) {
          setLoading(false)
          setSubTasks(listSubTask?.data)
        }
      } catch (error) {
        console.error('Error fetching subtasks:', error);
      }
    };
    
    if (isOpen || taskDetailId) {
      setLoading(true);
      fetchSubTasks();
    }
    
  }, [isOpen, taskDetailId, parentTaskId]);
}
