import { Router } from 'express';
import { AuthRequest } from '../../types';
import { mdTaskStatusGetByProjectId } from '@shared/models';

const router = Router();

router.get('/project/status/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId;

  mdTaskStatusGetByProjectId(projectId)
    .then(result => {
      console.log(result);
      res.json({ status: 200 });
    })
    .catch(err => {
      console.log(err);
    });
});

export default router;
