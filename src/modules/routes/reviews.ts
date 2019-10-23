import * as boom from "boom"
import * as fp from "fastify-plugin"

export default fp(async (server, opts, next) => {
    // Get all reviews
    server.route({
        method: 'GET',
        url: '/api/reviews',
        handler: async (request, reply) => {
            try {
                const reviews = await server.db.models.review.find()
                return reply.send(reviews)
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })

    // Get single review by id
    server.route({
        method: 'GET',
        url: '/api/reviews/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const review = await server.db.models.review.findById(_id)
                return reply.send(review)
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })

    // Get reviews by restaurant id
    server.route({
        method: 'GET',
        url: '/api/restaurants/:id/reviews',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const reviews = await server.db.models.review.find({ restaurantId: _id })
                return reply.send(reviews)
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })

    // Add a new review
    server.route({
        method: 'POST',
        url: '/api/reviews',
        handler: async (request, reply) => {
            try {
                const review = new server.db.models.review(request.body)
                return review.save()
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })

    // Update an existing review
    server.route({
        method: 'PUT',
        url: '/api/reviews/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const review = request.body
                const { ...updateData } = review
                const update = await server.db.models.review.findByIdAndUpdate(_id, updateData, { new: true })
                return update
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })

    // Delete a review
    server.route({
        method: 'DELETE',
        url: '/api/reviews/:id',
        handler: async (request, reply) => {
            try {
                const _id = request.params.id
                const review = server.db.models.review.findByIdAndRemove(_id)
                return review
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })
})