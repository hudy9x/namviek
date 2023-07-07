import { Router } from 'express';
import { AuthRequest } from '../../types';
import { mdTaskStatusGetByProjectId } from '@shared/models';

const router = Router();

router.get('/project/status/:projectId', async (req: AuthRequest, res) => {
  const projectId = req.params.projectId;

  mdTaskStatusGetByProjectId(projectId)
    .then(result => {
      console.log('status =================')
      console.log('done');
      console.log('end status --------------')
      res.json({ status: 200, data: result });
    })
    .catch(err => {
      console.log(err);
    });
});

export default router;
