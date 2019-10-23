export function authorization(server, request, reply, next) {
    const token = extractToken(request)
    if (!token) {
        reply.header('WWW-Authenticate', 'Bearer token_type="JWT"')
        reply.send({ msg: 'Você precisa se autenticar.' })
    } else {
        console.log(token)
        server.jwt.verify(token, (error, decoded) => {
            if (decoded) {
                next()
            } else {
                reply.send({ msg: 'Não autorizado' })
            }
        })
    }
}

function extractToken(request): string {
    let token = undefined
    if (request.headers && request.headers.authorization) {
        const parts: string[] = request.headers.authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }
    return token
}