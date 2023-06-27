import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from "@prisma/client";
// import { mdUserAdd } from "@shared/models";
// import { validateRegisterUser } from "@shared/validation";

export default async function(f: FastifyInstance) {
	f.post(
		'/api/auth/signup',
		async function(req: FastifyRequest, res: FastifyReply) {

			try {

				const body = req.body as User
				// const { error, errorArr, data } = validateRegisterUser(body)

				// console.log(error, data)

				return {status: 200}

				// const user = await mdUserAdd({
				// 	email: body.email,
				// 	password: body.password,
				// 	name: body.name,
				// 	country: null,
				// 	bio: null,
				// 	dob: null,
				//
				// 	createdAt: new Date(),
				// 	createdBy: '9879uh',
				// 	updatedAt: null,
				// 	updatedBy: null
				// })
				//
				//
				// return { status: 200, data: user };
			} catch (error) {
				return { status: 500, error }
			}
		}
	);
}
