import * as boom from "boom"
import * as fp from "fastify-plugin"

export default fp(async (server, opts, next) => {
    // Get all orders
    server.get("/api/orders", {}, async (request, reply) => {
        try {
            const orders = await server.db.models.order.find()
            return reply.send(orders)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get single order by id
    server.get("/api/orders/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const order = await server.db.models.order.findById(_id)
            return reply.send(order)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Add a new order
    server.post("/api/orders", {}, async (request, reply) => {
        try {
            const order = new server.db.models.order(request.body)
            return order.save()
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Delete a review
    server.delete("/api/orders/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const order = server.db.models.order.findByIdAndRemove(_id)
            return order
        } catch (err) {
            throw boom.boomify(err)
        }
    })
})