import * as boom from "boom"
import * as fp from "fastify-plugin"

export default fp(async (server, opts, next) => {
    // Get all restaurants
    server.get("/api/restaurants", {}, async (request, reply) => {
        try {
            let restaurants = []
            if (request.query.q) {
                let regex = new RegExp(request.query.q, "i")
                let query = { $or: [{ name: regex }, { category: regex }, { about: regex }] }
                restaurants = await server.db.models.restaurant.find(query)
            }
            else {
                restaurants = await server.db.models.restaurant.find()
            }
            return reply.send(restaurants);
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get single restaurant by id
    server.get("/api/restaurants/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const restaurant = await server.db.models.restaurant.findById(_id)
            return reply.send(restaurant);
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Add a new restaurant
    server.post("/api/restaurants", {}, async (request, reply) => {
        try {
            const restaurant = new server.db.models.restaurant(request.body)
            return restaurant.save()
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Update an existing restaurant
    server.put("/api/restaurants/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const restaurant = request.body
            const { ...updateData } = restaurant
            const update = await server.db.models.restaurant.findByIdAndUpdate(_id, updateData, { new: true })
            return update
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Delete a restaurant
    server.delete("/api/restaurants/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const restaurant = server.db.models.restaurant.findByIdAndRemove(_id)
            return restaurant
        } catch (err) {
            throw boom.boomify(err)
        }
    })
})