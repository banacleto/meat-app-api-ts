import * as boom from "boom"
import * as fp from "fastify-plugin"
import { User, users } from "../../models/User"

export default fp(async (server, opts, next) => {
    // Get all restaurants
    server.get("/api/restaurants", opts, async (request, reply) => {
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

    // Get all menuItems
    server.get("/api/menu", {}, async (request, reply) => {
        try {
            const menuItems = await server.db.models.menuItem.find()
            return reply.send(menuItems)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get single menuItem by id
    server.get("/api/menu/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const menuItem = await server.db.models.menuItem.findById(_id)
            return reply.send(menuItem)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get menuItems by restaurant id
    server.get("/api/restaurants/:id/menu", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const menuItems = await server.db.models.menuItem.find({ restaurantId: _id })
            return reply.send(menuItems)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Add a new menuItem
    server.post("/api/menu", {}, async (request, reply) => {
        try {
            const menuItem = new server.db.models.menuItem(request.body)
            return menuItem.save()
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Update an existing menuItem
    server.put("/api/menu/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const menuItem = request.body
            const { ...updateData } = menuItem
            const update = await server.db.models.menuItem.findByIdAndUpdate(_id, updateData, { new: true })
            return update
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Delete a menuItem
    server.delete("/api/menu/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const menuItem = server.db.models.menuItem.findByIdAndRemove(_id)
            return menuItem
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get all reviews
    server.get("/api/reviews", {}, async (request, reply) => {
        try {
            const reviews = await server.db.models.review.find()
            return reply.send(reviews)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get single review by id
    server.get("/api/reviews/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const review = await server.db.models.review.findById(_id)
            return reply.send(review)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Get reviews by restaurant id
    server.get("/api/restaurants/:id/reviews", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const reviews = await server.db.models.review.find({ restaurantId: _id })
            return reply.send(reviews)
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Add a new review
    server.post("/api/reviews", {}, async (request, reply) => {
        try {
            const review = new server.db.models.review(request.body)
            return review.save()
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Update an existing review
    server.put("/api/reviews/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const review = request.body
            const { ...updateData } = review
            const update = await server.db.models.review.findByIdAndUpdate(_id, updateData, { new: true })
            return update
        } catch (err) {
            throw boom.boomify(err)
        }
    })

    // Delete a review
    server.delete("/api/reviews/:id", {}, async (request, reply) => {
        try {
            const _id = request.params.id
            const review = server.db.models.review.findByIdAndRemove(_id)
            return review
        } catch (err) {
            throw boom.boomify(err)
        }
    })

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