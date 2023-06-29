import Fastify from 'fastify';
import { sharedLibs } from '@shared/libs';

const fastify = Fastify({
	logger: true
});

// Declare a route
fastify.get('/', async function handler(request, reply) {
	return { hello: 'world', sharedUi: sharedLibs() };
});

async function bootstrap() {
	await fastify.listen({ port: 8080 });
}

bootstrap().catch(error => {
	fastify.log.error(error);
	process.exit(1);
});
