import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function (fastify: FastifyInstance) {
	fastify.get('/auth/signup', async function (request: FastifyRequest, reply: FastifyReply) {
		return { message: 'Sign in page' };
	});
}
