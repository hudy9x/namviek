import { useContext, useEffect } from 'react'
import { TaskContext } from './ListMode'
import { ITaskQuery, taskGetByCond } from '@/services/task'

export const useGetSubTasks = ({ parentTaskId, projectId }: { parentTaskId: string, projectId: string }) => {
  const { setSubTasks, isOpen, setLoading } = useContext(TaskContext)
  const newUrl = new URL(window.location.toString())
  const taskId = newUrl.searchParams.get('taskId')

  useEffect(() => {
    const fetchSubTasks = async () => {
      try {
        const query: ITaskQuery = {
          id: parentTaskId,
          projectId,
        };
        const response = await taskGetByCond(query);
        const listSubTask = response.data;
        if (listSubTask && listSubTask.data) {
          setLoading(false)
          setSubTasks(listSubTask?.data)
        }
      } catch (error) {
        console.error('Error fetching subtasks:', error);
      }
    };

    if (isOpen || taskId) {
      setLoading(true);
      fetchSubTasks();
    }
    
  }, [isOpen, taskId]);
}
