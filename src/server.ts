import 'dotenv/config';
import Fastify from 'fastify';
import { CreateCustomDegensHandler, GetDegenHandler, GetRandomDegensHandler } from './handlers.js';

const fastify = Fastify({
    logger: true,
})

fastify.get('/', async (req, res) => {
    return { test: 'works' }
});
fastify.get('/degen', GetDegenHandler);
fastify.get('/degen/:id', GetDegenHandler);
fastify.post('/', CreateCustomDegensHandler);

try {
    await fastify.listen({ port: 3000 })
} catch (error) {
    fastify.log.error(error);
}

