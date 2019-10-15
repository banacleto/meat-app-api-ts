import * as fastify from "fastify"
import * as blipp from "fastify-blipp"
import * as cors from "fastify-cors"
import * as swagger from "fastify-swagger"
import { IncomingMessage, Server, ServerResponse } from "http"
import { swaggerOptions } from "./config/swagger"
import db from "./modules/db"
import menuItemRoutes from "./modules/routes/menu-item"
import orderRoutes from "./modules/routes/order"
import restaurantRoutes from "./modules/routes/restaurant"
import reviewRoutes from "./modules/routes/review"
import statusRoutes from "./modules/routes/status"

// Creates a simple fastify server
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

// Configuring CORS w/ Dynamic Origin
const whitelist = ['http://localhost:4200']
server.register(cors, {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    }
})

server.register(db, { uri: "mongodb://localhost/meatappdb" })
server.register(blipp)
server.register(swagger, swaggerOptions)

// Register routes
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