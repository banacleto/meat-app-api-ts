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
    imagePath: String,
    name: String,
    description: String,
    price: Number,
    restaurantId: Schema.Types.ObjectId
})

export const MenuItem: Model<MenuItemModel> = model<MenuItemModel>("MenuItem", MenuItemSchema)