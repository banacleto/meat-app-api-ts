import { Document, Schema, Model, model } from "mongoose"

/**
 * Defines the Restaurant model for our MongoDb document
 */
export interface RestaurantDocument extends Document {
    name: String
    category: String
    deliveryEstimate: String
    rating: Number
    imagePath: String
    about: String
    hours: String
}

export interface RestaurantModel extends RestaurantDocument { }

export const RestaurantSchema: Schema = new Schema({
    name: String,
    category: String,
    deliveryEstimate: String,
    rating: Number,
    imagePath: String,
    about: String,
    hours: String
})

export const Restaurant: Model<RestaurantModel> = model<RestaurantModel>("Restaurant", RestaurantSchema)