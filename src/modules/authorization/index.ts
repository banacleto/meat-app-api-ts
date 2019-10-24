import * as fastify from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

export function authorization(server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>,
    request: fastify.FastifyRequest<IncomingMessage, fastify.DefaultQuery, fastify.DefaultParams, fastify.DefaultHeaders, any>,
    reply: fastify.FastifyReply<ServerResponse>, next) {
    const token = extractToken(request)
    if (!token) {
        reply.header('WWW-Authenticate', 'Bearer token_type="JWT"')
        reply.status(401).send({ msg: 'Você precisa se autenticar.' })
    } else {
        server.jwt.verify(token, (error, decoded) => {
            if (decoded) {
                next()
            } else {
                reply.status(403).send({ msg: 'Não autorizado' })
            }
        })
    }
}

function extractToken(request: fastify.FastifyRequest<IncomingMessage, fastify.DefaultQuery, fastify.DefaultParams, fastify.DefaultHeaders, any>): string {
    let token = undefined
    if (request.headers && request.headers.authorization) {
        const parts: string[] = request.headers.authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }
    return token
}