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
                    const token = server.jwt.sign({ subject: dbUser.email, issuer: 'meat-app-api-ts' })
                    reply.send({
                        firstName: dbUser.firstName,
                        middleName: dbUser.middleName,
                        lastName: dbUser.lastName,
                        fullName: dbUser.fullName,
                        email: dbUser.email,
                        accessToken: token
                    })
                } else {
                    reply.status(403).send({ msg: 'Dados Inválidos.' })
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