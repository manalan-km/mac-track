import { FastifyPluginAsync } from 'fastify'
import { databaseClient } from '../utils/database.js'
const macros: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const macrosSchema = {
        type: 'object',
        required: ['calories', 'protein', 'meal_name'],
        properties: {
            calories: { type: 'number' },
            protein: { type: 'number' },
            fibre: { type: 'number' },
            meal_name: { type: 'string' },
        },
    }

    const schema = {
        body: macrosSchema,
    }

    fastify.post('/macros', { schema }, async function (request, reply) {
        const requestBody: any = request.body

        console.log('Inserting macros into database')

        const { error } = await databaseClient.from('Macros').insert({
            calories: requestBody.calories,
            protein: requestBody.protein,
            fibre: requestBody.fibre,
            meal_name: requestBody.meal_name,
        })

        if (error) {
            console.error('Something went wrong: ', error)
            reply.status(500)
        }

        console.log('Done')
        reply.status(204)
    })
}

export default macros
