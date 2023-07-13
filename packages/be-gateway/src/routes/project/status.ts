import { Router } from 'express';
import { AuthRequest } from '../../types';
import { mdTaskStatusAdd, mdTaskStatusGetByProjectId, mdTaskStatusUpdate, mdTaskStatusDel } from '@shared/models';
import { TaskStatus } from '@prisma/client';

const router = Router();

router.post('/project/status/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId;
  const body = req.body as TaskStatus;
  const data = {
    projectId,
    name: body.name,
    color: body.color,
    order: body.order
  };
  mdTaskStatusAdd(data)
    .then(result => {
      console.log(result);
      res.json({ status: 200, data: result });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/project/status/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId;

  mdTaskStatusGetByProjectId(projectId)
    .then(result => {
      console.log(result);
      res.json({ status: 200, data: result });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put('/project/status', async (req: AuthRequest, res) => {
  const body = req.body as Partial<TaskStatus>;
  mdTaskStatusUpdate(body)
    .then(result => {
      res.json({ status: 200, data: result });
    })
    .catch(err => {
      console.log(err);
    });
});


router.delete('/project/status/:id', async (req: AuthRequest, res) => {
  const id = req.params.id;
  mdTaskStatusDel(id)
    .then(result => {
      console.log(result);
      res.json({ status: 200, data: result });
    })
    .catch(err => {
      console.log(err);
    });
});

export default router;
