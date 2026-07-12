import { FastifyPluginAsync } from 'fastify'
import { databaseClient } from '@mactrack/utils'
import { datePeriodCalculator, Mode } from '../utils/dateCalculator.js'

interface ReportQuerystring {
    mode: Mode
}

const report: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const querySchema = {
        type: 'object',
        required: ['mode'],
        properties: {
            mode: { type: 'string', enum: ['today', 'week', 'month'] },
        },
    }

    const schema = {
        querystring: querySchema,
    }

    fastify.get<{ Querystring: ReportQuerystring }>(
        '/report',
        { schema },
        async function (req, reply) {
            const reportMode = req.query.mode
            const { startDate, endDate } = datePeriodCalculator(reportMode)
            const { data, error } = await databaseClient
                .from('Macros')
                .select('*')
                .gte('created_at', startDate)
                .lte('created_at', endDate)
            reply.send({ data, startDate, endDate })
            if (error) {
                console.error('Something went wrong: ', error)
            }
        }
    )
}

export default report
