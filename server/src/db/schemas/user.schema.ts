import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface User extends mongoose.Document {
    email: string,
    password: string,
    tokens: [string]
}

const UserModelSchema = new Schema<User>({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }, 
    tokens: {
        type: [String]
    }
});

export const UserModel = mongoose.model<User>("User", UserModelSchema);
