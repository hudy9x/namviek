/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, Response, Request } from 'express';
import cors from "cors";
import { ClerkExpressRequireAuth, ClerkExpressWithAuth, LooseAuthProp, WithAuthProp } from "@clerk/clerk-sdk-node";
import { sharedLibs } from "@shared/libs";
import { addTask } from "@shared/models";

const app: Application = express();

declare global {
	namespace Express {
		interface Request extends LooseAuthProp { }
	}
}

type RequestAuth = WithAuthProp<Request>

app.use(cors())

app.post('/api/project', (req: RequestAuth, res: Response) => {
	res.json({
		status: 200
	})
})

app.post('/api/task', ClerkExpressRequireAuth({}), (req: WithAuthProp<Request>, res: Response) => {

	addTask().then(() => {

		res.json({
			status: 200,
			message: 'Done'
		})
	})


})

app.get('/api/home', ClerkExpressWithAuth({}), (req: WithAuthProp<Request>, res: Response) => {

	console.log(req.auth)

	res.json({
		status: 200,
		message: 'success'
	})
})

app.get('/api', (req, res) => {
	res.send({
		message: 'Welcome to be-gateway!',
		text: sharedLibs()
	});
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
