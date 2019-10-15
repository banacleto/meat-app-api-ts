import { Document, Schema, Model, model } from "mongoose"

/**
 * Defines the Review model for our MongoDb document
 */
export interface ReviewDocument extends Document {
    name: String
    date: String
    rating: Number
    comments: String
}

export interface ReviewModel extends ReviewDocument { }

export const ReviewSchema: Schema = new Schema({
    name: String,
    date: String,
    rating: Number,
    comments: String,
    restaurantId: Schema.Types.ObjectId
})

export const Review: Model<ReviewModel> = model<ReviewModel>("Review", ReviewSchema)