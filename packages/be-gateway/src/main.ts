/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application, Response, Request } from 'express';
import cors from "cors";
import * as path from 'path';
import { ClerkExpressWithAuth, LooseAuthProp, WithAuthProp } from "@clerk/clerk-sdk-node";
import { sharedLibs } from "@shared/libs";

const app: Application = express();

declare global {
	namespace Express {
		interface Request extends LooseAuthProp { }
	}
}

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors())

app.get('')

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
