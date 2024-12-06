import {prisma} from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import {z} from 'zod';


export async function create(app: FastifyInstance)
{
    app.post('/tarefa', async (request, reply) => {
        const validating = z.object({
            title: z.string(),
            description: z.string(),
            completed_at: z.date().optional()
        })


        const {title, description, completed_at} = validating.parse(request.body);

        const datas = await prisma.tarefas.create({
            data: {
                title,
                description,
                completed_at
            },
        });
    });
}