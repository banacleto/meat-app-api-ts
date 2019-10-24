import { Document, Schema, Model, model } from "mongoose"

/**
 * Defines the Order model for our MongoDb document
 */
export interface OrderDocument extends Document {
    name: String
    email: String
    emailConfirmation: String
    address: String
    number: Number
    optionalAddress: String
    paymentOption: String
}

export interface OrderModel extends OrderDocument { }

export const OrderSchema: Schema = new Schema({
    name: String,
    email: String,
    emailConfirmation: String,
    address: String,
    number: Number,
    optionalAddress: String,
    paymentOption: String,
    orderItems: [new Schema({ quantity: Number, menuId: Schema.Types.ObjectId })]
})

export const Order: Model<OrderModel> = model<OrderModel>("Order", OrderSchema)