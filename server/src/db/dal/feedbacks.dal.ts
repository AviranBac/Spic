import mongoose, { Require_id } from "mongoose";
import { Feedback, FeedbackModel } from "../schemas/feedback.schema";

export type FeedbackWithId = Feedback & Require_id<Feedback>;

export const getFeedbacksByUserIdAndItemIds = async (userId: mongoose.Types.ObjectId, itemIds: mongoose.Types.ObjectId[]): Promise<FeedbackWithId[]> => {
    return FeedbackModel
        .find({userId, itemId: {$in: itemIds}})
        .lean();
};