import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { create } from './routes/create';
import { select } from './routes/select';
import { Delete } from './routes/delete';
import { update } from './routes/update';

const app = fastify({
    logger: true,
});
app.register(fastifyCors, {
    origns:"*", 
    crendentials: true})
app.register(create);
app.register(select);
app.register(Delete);
app.register(update);

app.listen({port: 3000, host: "0.0.0.0"}).then(() => {console.log('Servidor Rodando..')});