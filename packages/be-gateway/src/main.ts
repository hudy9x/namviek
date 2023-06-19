/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, Response, Request } from 'express';
import cors from "cors";
import { ClerkExpressWithAuth, LooseAuthProp, WithAuthProp } from "@clerk/clerk-sdk-node";
import { mdProjectAdd, mdMemberAdd, mdMemberGetProject, mdProjectGetAllByIds } from "@shared/models";
import { MemberRole } from '@prisma/client';

const app: Application = express();

declare global {
	namespace Express {
		interface Request extends LooseAuthProp { }
	}
}

type RequestAuth = WithAuthProp<Request>

app.use(cors())
app.use(express.json())

app.get('/api/project', ClerkExpressWithAuth(), async (req: RequestAuth, res: Response) => {

	const { userId } = req.auth

	try {

		const invitedProjects = await mdMemberGetProject(userId)

		if (!invitedProjects) {
			console.log("You're not invited to no projects")
			return res.json({
				status: 200,
				data: []
			})
		}

		const projectIds = invitedProjects.map(p => p.projectId)

		const projects = await mdProjectGetAllByIds(projectIds)

		console.log('get project success')

		res.json({
			status: 200,
			data: projects
		})

	} catch (error) {
		console.log('get project by member error', error)
		res.json({
			status: 500,
			err: error,
			data: []
		})
	}


})

app.post('/api/project', ClerkExpressWithAuth(), async (req: RequestAuth, res: Response) => {

	const body = req.body as { name: string, desc: string, organizationId: string }
	const { userId } = req.auth;

	console.log('orgina;', body.organizationId)

	const result = await mdProjectAdd({
		cover: null,
		icon: null,
		name: body.name,
		desc: body.desc,
		createdBy: userId,
		createdAt: new Date(),
		organizationId: body.organizationId || "897821",
		updatedAt: null,
		updatedBy: null
	})

	await mdMemberAdd({
		uid: userId,
		projectId: result.id,
		role: MemberRole.MANAGER,
		createdAt: new Date(),
		createdBy: userId,
		updatedBy: null,
		updatedAt: null
	})

	res.json({
		status: 200,
		data: result
	})
})


app.get('/api/home', ClerkExpressWithAuth({}), (req: WithAuthProp<Request>, res: Response) => {

	res.json({
		status: 200,
		message: 'success'
	})
})


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
