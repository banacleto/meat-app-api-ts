import * as fastify from "fastify"
import * as blipp from "fastify-blipp"
import * as cors from "fastify-cors"
import * as jwt from "fastify-jwt"
import * as swagger from "fastify-swagger"
import * as fs from "fs"
import { IncomingMessage, Server, ServerResponse } from "http"
import * as path from "path"
import { corsOptions } from "./config/cors"
import { jwtOptions } from "./config/jwt"
import { swaggerOptions } from "./config/swagger"
import auth from "./modules/authentication"
import db from "./modules/db"
import routes from "./modules/routes"

// Creates a simple fastify server with HTTPS
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    https: {
        allowHTTP1: true,
        key: fs.readFileSync(path.join(__dirname, '..', 'security/keys', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '..', 'security/keys', 'cert.pem'))
    }
})

server.register(cors, corsOptions)
server.register(db, { uri: "mongodb://localhost/meatappdb" })
server.register(blipp)
server.register(swagger, swaggerOptions)
server.register(jwt, jwtOptions)

// Register routes
server.register(auth)
// server.register(authz)
server.register(routes)

const start = async () => {
    try {
        await server.listen(3000, "0.0.0.0")
        server.blipp()
        server.swagger()
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

process.on("uncaughtException", error => { console.error(error) })
process.on("unhandledRejection", error => { console.error(error) })

start()