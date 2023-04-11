import mongoose from "mongoose";
import { UserModel } from "./user.schema";
import { ItemModel } from "./item.schema";

const Schema = mongoose.Schema;

export interface Favorite {
    id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId,
    itemIds: [mongoose.Types.ObjectId]
}

const FavoriteModelSchema = new Schema<Favorite>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    itemIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: ItemModel.modelName
    }]
});

export const FavoriteModel = mongoose.model<Favorite>("favorite", FavoriteModelSchema);