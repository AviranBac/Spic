import { model, Schema, Document } from "mongoose";

export interface IToken {
    token: string,
    expiryDate: Date
}

export interface IUser extends Document {
    email: string,
    password: string,
    tokens: IToken[]
}

const UserModelSchema = new Schema<IUser>({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tokens: {
        type: [{
            token: {
                type: String,
                require: true
            },
            expiryDate: {
                type: Date,
                require: true
            }
        }]
    }
});

export const UserModel = model<IUser>("User", UserModelSchema);
