import * as boom from "boom";
import * as fp from "fastify-plugin";
import { authorization } from "../authorization";

export default fp(async (server, opts, next) => {
    // Get all orders
    server.route({
        method: 'GET',
        url: '/api/orders',
        handler: async (request, reply) => {
            try {
                const orders = await server.db.models.order.find()
                return reply.send(orders)
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        onRequest: function (request, reply, next) {
            authorization(server, request, reply, next)
        }
    })

    // Get single order by id
    server.route({
        method: 'GET',
        url: '/api/orders/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const order = await server.db.models.order.findById(_id)
                return reply.send(order)
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        onRequest: function (request, reply, next) {
            authorization(server, request, reply, next)
        }
    })

    // Add a new order
    server.route({
        method: 'POST',
        url: '/api/orders',
        handler: async (request, reply) => {
            try {
                const order = new server.db.models.order(request.body)
                return order.save()
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        onRequest: function (request, reply, next) {
            authorization(server, request, reply, next)
        }
    })

    // Delete a order
    server.route({
        method: 'DELETE',
        url: '/api/orders/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const order = server.db.models.order.findByIdAndRemove(_id)
                return order
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        onRequest: function (request, reply, next) {
            authorization(server, request, reply, next)
        }
    })

})