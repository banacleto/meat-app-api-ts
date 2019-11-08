import { Document, Schema, Model, model } from "mongoose"

/**
 * Defines the MenuItem model for our MongoDb document
 */
export interface MenuItemDocument extends Document {
    imagePath: String
    name: String
    description: String
    price: Number
}

export interface MenuItemModel extends MenuItemDocument { }

export const MenuItemSchema: Schema = new Schema({
    imagePath: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    restaurantId: { type: Schema.Types.ObjectId, required: true }
})

export const MenuItem: Model<MenuItemModel> = model<MenuItemModel>("MenuItem", MenuItemSchema)