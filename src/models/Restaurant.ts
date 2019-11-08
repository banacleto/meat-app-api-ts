import { Document, Schema, Model, model } from "mongoose"

/**
 * Defines the Restaurant model for our MongoDb document
 */
export interface RestaurantDocument extends Document {
    name: String
    category: String
    deliveryEstimate: String
    rating?: Number
    imagePath: String
    about: String
    hours: String
}

export interface RestaurantModel extends RestaurantDocument { }

export const RestaurantSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    deliveryEstimate: { type: String, required: true },
    rating: Number,
    imagePath: { type: String, required: true },
    about: { type: String, required: true },
    hours: { type: String, required: true }
})

export const Restaurant: Model<RestaurantModel> = model<RestaurantModel>("Restaurant", RestaurantSchema)