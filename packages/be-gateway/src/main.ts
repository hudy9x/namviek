/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, Response, Request } from 'express';
import cors from "cors";
import { ClerkExpressRequireAuth, ClerkExpressWithAuth, LooseAuthProp, WithAuthProp } from "@clerk/clerk-sdk-node";

const app: Application = express();

declare global {
	namespace Express {
		interface Request extends LooseAuthProp { }
	}
}

type RequestAuth = WithAuthProp<Request>

app.use(cors())
app.use(express.json())

app.post('/api/project', ClerkExpressWithAuth(), (req: RequestAuth, res: Response) => {

	const body = req.body

	console.log(body, req.auth)
	
	res.json({
		status: 200,
		body
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
