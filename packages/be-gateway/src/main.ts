/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { mdProjectAdd, mdMemberAdd, mdMemberGetProject, mdProjectGetAllByIds, mdOrgAdd, mdOrgMemAdd } from '@shared/models';
import { InvitationStatus, MemberRole, OrganizationRole } from '@prisma/client';
import Routes from './routes';

const app: Application = express();

app.use(cors({
  exposedHeaders: ['Authorization', 'RefreshToken']
}));
app.use(express.json());

app.use('/api', Routes);
// app.post('/api/organization', async (req: RequestAuth, res: Response) => {
// 	const { userId } = req.auth;
//
// 	try {
// 		const body = req.body;
//
// 		const result = await mdOrgAdd({
// 			name: body.name,
// 			cover: null,
// 			avatar: null,
// 			desc: null
// 		});
//
// 		// FIXED : uid is incorrect type
// 		await mdOrgMemAdd({
// 			uid: userId,
// 			organizationId: result.id,
// 			role: OrganizationRole.ADMIN,
// 			status: InvitationStatus.ACCEPTED
// 		});
//
// 		res.json({
// 			status: 200,
// 			err: null,
// 			data: result
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.json({
// 			status: 500,
// 			err: error
// 		});
// 	}
// });

// app.get('/api/project',  async (req: RequestAuth, res: Response) => {
// 	const { userId } = req.auth;
//
// 	try {
// 		const invitedProjects = await mdMemberGetProject(userId);
//
// 		if (!invitedProjects) {
// 			console.log("You're not invited to no projects");
// 			return res.json({
// 				status: 200,
// 				data: []
// 			});
// 		}
//
// 		const projectIds = invitedProjects.map(p => p.projectId);
// 		const projects = await mdProjectGetAllByIds(projectIds);
//
// 		console.log('get project success');
//
// 		res.json({
// 			status: 200,
// 			data: projects
// 		});
// 	} catch (error) {
// 		console.log('get project by member error', error);
// 		res.json({
// 			status: 500,
// 			err: error,
// 			data: []
// 		});
// 	}
// });

// app.post('/api/project', async (req: RequestAuth, res: Response) => {
// 	const body = req.body as { name: string; desc: string; organizationId: string };
// 	const { userId } = req.auth;
//
// 	console.log('orgina;', body.organizationId);
//
// 	const result = await mdProjectAdd({
// 		cover: null,
// 		icon: null,
// 		name: body.name,
// 		desc: body.desc,
// 		createdBy: userId,
// 		createdAt: new Date(),
// 		organizationId: body.organizationId || '897821',
// 		updatedAt: null,
// 		updatedBy: null
// 	});
//
// 	await mdMemberAdd({
// 		uid: userId,
// 		projectId: result.id,
// 		role: MemberRole.MANAGER,
// 		createdAt: new Date(),
// 		createdBy: userId,
// 		updatedBy: null,
// 		updatedAt: null
// 	});
//
// 	res.json({
// 		status: 200,
// 		data: result
// 	});
// });


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
