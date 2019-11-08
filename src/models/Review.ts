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
    name: { type: String, required: true },
    date: { type: String, required: true },
    rating: { type: Number, required: true },
    comments: { type: String, required: true },
    restaurantId: { type: Schema.Types.ObjectId, required: true }
})

export const Review: Model<ReviewModel> = model<ReviewModel>("Review", ReviewSchema)