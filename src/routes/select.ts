import {prisma} from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import {z} from 'zod';

export async function select(app: FastifyInstance)
{
    app.get('/tarefa', async (_, reply) => {
        const datas = await prisma.tarefas.findMany();
        reply.status(200).send(datas);
    });

    app.get('/tarefa/:id', async (request, reply) => {
        const validating = z.object({
            id: z.string().uuid()
        })

        const {id} = validating.parse(request.params);

        const datas = await prisma.tarefas.findFirst({ where: { id } });

        reply.status(200).send(datas);
     });
    
}