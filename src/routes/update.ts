import {prisma} from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import {z} from 'zod';

export async function update(app: FastifyInstance)
{

    app.put('/tarefa/:id', async (request, reply) => {
        const validatingparams = z.object({
            id: z.string().uuid()
        })

        const validatingbody = z.object({
            title: z.string(),
            description: z.string(),
            completed_at: z.date().optional()
        })

        const {id} = validatingparams.parse(request.params);
        const {title, description, completed_at} = validatingbody.parse(request.body);
        const idcheck = await prisma.tarefas.findFirst({ where: { id } });
        if(!idcheck)
        {
            reply.code(200).send({
                Informação: "O Id não existe"
            });
        }
        const data = await prisma.tarefas.update({ 
            where: { id },
            data: {
                title,
                description,
                completed_at
            }
        });

        reply.status(200).send(data);
     });
    
}