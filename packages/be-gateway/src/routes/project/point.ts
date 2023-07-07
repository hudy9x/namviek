import { Router } from 'express';
import { AuthRequest } from '../../types';
import { mdTaskPointGetByProjectId } from '@shared/models';

const router = Router();

router.get('/project/point/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId;

  mdTaskPointGetByProjectId(projectId)
    .then(result => {
      console.log(result);
      res.json({ status: 200 });
    })
    .catch(err => {
      console.log(err);
    });
});

export default router;
