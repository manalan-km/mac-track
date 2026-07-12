import { FastifyPluginAsync } from 'fastify'
import { databaseClient } from '@mactrack/utils'

const weight: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const weightSchema = {
        type: 'object',
        required: ['weight'],
        properties: {
            weight: { type: 'number' },
        },
    }
    const schema = {
        body: weightSchema,
    }
    fastify.post('/weight', { schema }, async function (request, reply) {
        const requestBody: any = request.body

        console.info('Inserting weight into database')

        const { error } = await databaseClient.from('weight').insert({
            weight: requestBody.weight,
        })

        if (error) {
            console.error(
                'Something went wrong while inserting weight into DB: ',
                error
            )
            reply.status(500)
            return
        }

        console.info('Done')
        reply.status(204)
    })
}

export default weight
