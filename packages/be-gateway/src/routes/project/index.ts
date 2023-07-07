import { Router } from 'express';
import { authMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';
import { mdMemberAdd, mdMemberGetProject, mdProjectAdd, mdProjectGetAllByIds } from '@shared/models';
import { MemberRole } from '@prisma/client';

import StatusRouter from './status';
import TagRouter from './tag';
import PointRouter from './point';

const router = Router();

router.use([authMiddleware]);

router.use([StatusRouter, TagRouter, PointRouter]);

// It means GET:/api/project
router.get('/project', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen;

  try {
    const invitedProjects = await mdMemberGetProject(userId);

    if (!invitedProjects) {
      console.log("You're not invited to no projects");
      return res.json({
        status: 200,
        data: []
      });
    }

    const projectIds = invitedProjects.map(p => p.projectId);
    const projects = await mdProjectGetAllByIds(projectIds);

    console.log('get project success');

    res.json({
      status: 200,
      data: projects
    });
  } catch (error) {
    console.log('get project by member error', error);
    res.json({
      status: 500,
      err: error,
      data: []
    });
  }
});

// It means POST:/api/project
router.post('/project', async (req: AuthRequest, res) => {
  const body = req.body as { name: string; desc: string; organizationId: string };
  const { id: userId } = req.authen;

  console.log('project data:', body);

  const result = await mdProjectAdd({
    cover: null,
    icon: null,
    name: body.name,
    desc: body.desc,
    createdBy: userId,
    createdAt: new Date(),
    organizationId: body.organizationId,
    updatedAt: null,
    updatedBy: null
  });

  await mdMemberAdd({
    uid: userId,
    projectId: result.id,
    role: MemberRole.MANAGER,
    createdAt: new Date(),
    createdBy: userId,
    updatedBy: null,
    updatedAt: null
  });

  res.json({
    status: 200,
    data: result
  });
});

export default router;
