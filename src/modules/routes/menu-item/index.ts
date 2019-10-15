import * as boom from "boom"
import * as fp from "fastify-plugin"

export default fp(async (server, opts, next) => {
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
})