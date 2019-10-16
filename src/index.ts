import * as fastify from "fastify"
import * as blipp from "fastify-blipp"
import * as cors from "fastify-cors"
import * as swagger from "fastify-swagger"
import * as fs from "fs"
import { IncomingMessage, Server, ServerResponse } from "http"
import * as path from "path"
import { corsOptions } from "./config/cors"
import { swaggerOptions } from "./config/swagger"
import db from "./modules/db"
import handleAuthentication from "./modules/routes/login"
import menuItemRoutes from "./modules/routes/menu-item"
import orderRoutes from "./modules/routes/order"
import restaurantRoutes from "./modules/routes/restaurant"
import reviewRoutes from "./modules/routes/review"
import statusRoutes from "./modules/routes/status"

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

// Register routes
server.register(handleAuthentication)
server.register(restaurantRoutes)
server.register(menuItemRoutes)
server.register(reviewRoutes)
server.register(orderRoutes)
server.register(statusRoutes)

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