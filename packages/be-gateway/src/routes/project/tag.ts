import { Router } from 'express';
import { AuthRequest } from '../../types';
import { mdTagGetByProjectId } from '@shared/models';

const router = Router();

router.get('/project/tag/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId;

  mdTagGetByProjectId(projectId)
    .then(result => {
      console.log('done tag')
      res.json({ status: 200 });
    })
    .catch(err => {
      console.log(err);
    });
});

export default router;
