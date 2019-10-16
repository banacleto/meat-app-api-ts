import * as boom from "boom"
import * as fp from "fastify-plugin"
import { User, users } from "../../../models/User"

export default fp(async (server, opts, next) => {
    server.post("/login", {}, async (request, reply) => {
        try {
            const user: User = request.body
            if (isValid(user)) {
                const dbUser: User = users[user.email]
                reply.send({ name: dbUser.name, email: dbUser.email })
            } else {
                reply.send({ msg: 'Dados Inválidos.' })
            }
        } catch (err) {
            throw boom.boomify(err)
        }
    })
})

function isValid(user: User): boolean {
    if (!user) {
        return false
    }
    const dbUser = users[user.email]
    
    console.log(dbUser)

    return dbUser !== undefined && dbUser.matches(user)
}