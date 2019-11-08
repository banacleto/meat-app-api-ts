import * as boom from "boom";
import * as fp from "fastify-plugin";
import { IUser } from "models/User";
import { authorization } from "../authorization";

export default fp(async (server, opts, next) => {
    // Get all users
    server.route({
        method: 'GET',
        url: '/api/users',
        handler: async (request, reply) => {
            try {
                const users = await server.db.models.user.find()
                return reply.send(users)
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        onRequest: function (request, reply, next) {
            authorization(server, request, reply, next)
        }
    })

    // Get single user by id
    server.route({
        method: 'GET',
        url: '/api/users/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const user = await server.db.models.user.findById(_id)
                return reply.send(user)
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        onRequest: function (request, reply, next) {
            authorization(server, request, reply, next)
        }
    })

    // Add a new user
    server.route({
        method: 'POST',
        url: '/api/users',
        handler: async (request, reply) => {
            try {
                if (!await server.db.models.user.findOne({ email: request.body.email })) {
                    const user = new server.db.models.user(request.body)
                    return user.save()
                } else {
                    reply.status(403).send({ msg: 'e-mail já cadastrado.' });
                }
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })

    // Update an existing user
    server.route({
        method: 'PUT',
        url: '/api/users/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const user = request.body
                const { ...updateData } = user
                const update = await server.db.models.user.findByIdAndUpdate(_id, updateData, { new: true })
                return update
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        // onRequest: function (request, reply, next) {
        //     authorization(server, request, reply, next)
        // }
    })
})