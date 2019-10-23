import * as boom from "boom"
import * as fp from "fastify-plugin"
import { User, users } from "../../models/User"

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
        handler: (request, reply) => {
            try {
                const user: User = request.body
                if (isValid(user)) {
                    const dbUser = users[user.email]
                    const token = server.jwt.sign({ sub: dbUser.email, iss: 'meat-app-api-ts' })
                    reply.send({ name: dbUser.name, email: dbUser.email, accessToken: token })
                } else {
                    reply.send({ msg: 'Dados Inválidos.' })
                }
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })
})

function isValid(user: User): boolean {
    if (!user) {
        return false
    }
    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}