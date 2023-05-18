import { Document, model, Schema } from "mongoose";

export interface IToken {
    token: string,
    expiryDate: Date
}

export interface IUser extends Document {
    email: string,
    username: string,
    gender: string, 
    age: number,
    password: string,
    refreshTokens: IToken[],
}

const UserModelSchema = new Schema<IUser>({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    refreshTokens: {
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
