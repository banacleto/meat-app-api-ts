import * as boom from "boom";
import * as fp from "fastify-plugin";
import { IUser } from "models/User";

export default fp(async (server, opts, next) => {
    server.route({
        method: 'POST',
        url: '/api/login',
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            }
        },
        handler: async (request, reply) => {
            try {
                const user: IUser = await server.db.models.user.findOne({ email: request.body.email });
                if (user && user.password == request.body.password) {
                    const token = server.jwt.sign({ subject: user.email, issuer: 'meat-app-api-ts' })
                    user.accessToken = token
                    reply.send(user)
                } else {
                    reply.status(403).send({ msg: 'Dados Inválidos.' })
                }
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })
})