import {prisma} from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import {z} from 'zod';

export async function Delete(app: FastifyInstance)
{

    app.delete('/tarefa/:id', async (request, reply) => {
        const validating = z.object({
            id: z.string().uuid()
        })

        const {id} = validating.parse(request.params);
        const idcheck = await prisma.tarefas.findFirst({ where: { id } });
        if(!idcheck)
        {
            reply.code(200).send({
                Informação: "O Id não existe"
            });
        }
        const data = await prisma.tarefas.delete({ where: { id } });
        reply.status(200).send(data);
     });
    
}