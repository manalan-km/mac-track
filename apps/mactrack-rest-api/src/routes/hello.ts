import { FastifyPluginAsync } from 'fastify'

const hello: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/hello', async function (request, response) {
        return { message: 'Hello world' }
    })
}

export default hello
