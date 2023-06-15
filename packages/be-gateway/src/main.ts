/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, Response, Request } from 'express';
import cors from "cors";
import { ClerkExpressWithAuth, LooseAuthProp, WithAuthProp } from "@clerk/clerk-sdk-node";
import { mdProjectAdd } from "@shared/models";

const app: Application = express();

declare global {
	namespace Express {
		interface Request extends LooseAuthProp { }
	}
}

type RequestAuth = WithAuthProp<Request>

app.use(cors())
app.use(express.json())

app.get('/api/project', ClerkExpressWithAuth(), async(req: RequestAuth, res: Response) => {

})

app.post('/api/project', ClerkExpressWithAuth(), async(req: RequestAuth, res: Response) => {

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

	console.log(result)
	
	res.json({
		status: 200,
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
