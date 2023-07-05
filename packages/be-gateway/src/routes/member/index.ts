import { Router } from 'express';
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';
import { mdMemberAdd, mdMemberGetAllByProjectId, mdMemberGetProject, mdProjectAdd, mdProjectGetAllByIds } from '@shared/models';
import { MemberRole } from '@prisma/client';

const router = Router();

router.use([authMiddleware, beProjectMemberMiddleware]);

// It means GET:/api/project
router.get('/project/member', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen;
  const query = req.query;

  try {
    const members = await mdMemberGetAllByProjectId(query.projectId as string);
    const users = members.map(m => ({...m.users, role: m.role}))

    res.json({
      status: 200,
      data: users
    });
  } catch (error) {
    console.log('get project member error', error);
    res.json({
      status: 500,
      err: error,
      data: []
    });
  }
});

// It means POST:/api/project
router.post('/project/member', async (req: AuthRequest, res) => {
  const body = req.body as { name: string; desc: string; organizationId: string };
  const { id: userId } = req.authen;

  console.log('project data:', body);

  // const result = await mdProjectAdd({
  // 	cover: null,
  // 	icon: null,
  // 	name: body.name,
  // 	desc: body.desc,
  // 	createdBy: userId,
  // 	createdAt: new Date(),
  // 	organizationId: body.organizationId,
  // 	updatedAt: null,
  // 	updatedBy: null
  // });
  //
  // await mdMemberAdd({
  // 	uid: userId,
  // 	projectId: result.id,
  // 	role: MemberRole.MANAGER,
  // 	createdAt: new Date(),
  // 	createdBy: userId,
  // 	updatedBy: null,
  // 	updatedAt: null
  // });
  //
  // res.json({
  // 	status: 200,
  // 	data: result
  // });
});

export default router;
