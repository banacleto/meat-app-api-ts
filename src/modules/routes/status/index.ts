import * as fp from "fastify-plugin"

/**
 * Declare our first route
 */
export default fp(async (server, opts, next) => {
    server.route({
        url: "/status",
        logLevel: "warn",
        method: ["GET", "HEAD"],
        handler: async (request, reply) => {
            return reply.send({ msg: 'This is CORS-enabled for a whitelisted domain.' })
        }
    })
    next()
})