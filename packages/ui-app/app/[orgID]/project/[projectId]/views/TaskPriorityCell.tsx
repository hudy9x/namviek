import { TaskPriority } from '@prisma/client';
import PrioritySelect from '../../../../_components/PrioritySelect';

export default function TaskPriorityCell({ taskId, value }: { taskId: string; value: TaskPriority | null }) {
  return <PrioritySelect className="task-priority" value={value || 'LOW'} />;
}
