import { Document, Model, model, Schema } from "mongoose"

/**
 * Defines the User model for our MongoDb document
 */
export interface IUser extends Document {
    firstName: String
    middleName?: String
    lastName: String
    email: String
    password: String
    address: String
    number: Number
    optionalAddress?: String
    accessToken?: String
}

export interface UserModel extends IUser { }

export const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: Number, required: true },
    optionalAddress: String,
    accessToken: String
})

export const User: Model<UserModel> = model<UserModel>("User", UserSchema)