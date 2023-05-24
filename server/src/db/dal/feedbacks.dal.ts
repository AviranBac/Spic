import mongoose, { Require_id } from "mongoose";
import { Feedback, FeedbackModel } from "../schemas/feedback.schema";

export type FeedbackWithId = Feedback & Require_id<Feedback>;

export const getFeedbacksByUserIdAndItemIds = async (userId: mongoose.Types.ObjectId, itemIds: mongoose.Types.ObjectId[]): Promise<FeedbackWithId[]> => {
    return FeedbackModel
        .find({userId, itemId: {$in: itemIds}})
        .lean();
};

export const replaceItemIdInFeedbacks = async (userId: mongoose.Types.ObjectId,
                                               oldItemId: mongoose.Types.ObjectId,
                                               newItemId: mongoose.Types.ObjectId): Promise<void> => {
    await FeedbackModel.updateMany(
        {userId, itemId: oldItemId},
        {itemId: newItemId}
    );
}

export const deleteItemIdFromFeedbacks = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<void> => {
    await FeedbackModel.deleteMany({userId, itemId});
}