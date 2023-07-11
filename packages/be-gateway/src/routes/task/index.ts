import { Router } from 'express';
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';
import { mdTaskAdd, mdTaskGetAll } from '@shared/models';
import { Task } from '@prisma/client';

const router = Router();

router.use([authMiddleware, beProjectMemberMiddleware]);

// It means GET:/api/example
router.get('/project/task', async (req: AuthRequest, res) => {
  console.log('called');
  const projectId = req.query.projectId as string;
  try {
    console.log('projectId', projectId);
    const tasks = await mdTaskGetAll({ projectId });
    res.json({ status: 200, data: tasks });
  } catch (error) {
    res.json({ status: 500, error });
  }
});

// It means POST:/api/example
router.post('/project/task', async (req: AuthRequest, res) => {
  console.log('auth user', req.authen);
  console.log('body', req.body);
  const { desc, assigneeIds, title, dueDate, projectId, priority } = req.body as Task;
  const { id } = req.authen;

  try {
    const result = await mdTaskAdd({
      title,
      startDate: null,
      dueDate,
      assigneeIds,
      desc,
      projectId,
      priority,
      taskStatusId: null,
      tagIds: [],
      parentTaskId: null,
      taskPoint: null,
      createdBy: id,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null
    });

    res.json({ status: 200, data: result });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, error });
  }
});

export default router;
