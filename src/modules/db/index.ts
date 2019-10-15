import * as fp from "fastify-plugin"
import * as Mongoose from "mongoose"
import { Model } from "mongoose"
import { MenuItem, MenuItemModel } from "../../models/MenuItem"
import { Order, OrderModel } from "../../models/Order"
import { Restaurant, RestaurantModel } from "../../models/Restaurant"
import { Review, ReviewModel } from "../../models/Review"

/**
 * Declares new interfaces Db and Model.
 */
export interface Models {
    restaurant: Model<RestaurantModel>,
    menuItem: Model<MenuItemModel>,
    review: Model<ReviewModel>,
    order: Model<OrderModel>
}

export interface Db {
    models: Models
}

/**
 * Creates a fastify plugin, which will expose our database access and models list through the 
 * fastify server instance. Our plugin decorates fastify with the new property db. This property 
 * in its turn contains all the models available. Again, according to the default definitions, 
 * fastify server instance does not contain any property called db, so let’s use augmentation 
 * again and update src/@types/augmentation.ts
 */
export default fp(async (fastify, opts: { uri: string }, next) => {
    Mongoose.connection.on("connected", () => { fastify.log.info({ actor: "MongoDB" }, "connected") })
    Mongoose.connection.on("disconnected", () => { fastify.log.error({ actor: "MongoDB" }, "disconnected") })

    await Mongoose.connect(opts.uri, { useNewUrlParser: true, keepAlive: 1 })

    const models: Models = {
        restaurant: Restaurant,
        menuItem: MenuItem,
        review: Review,
        order: Order
    }

    fastify.decorate("db", { models })

    next()
})