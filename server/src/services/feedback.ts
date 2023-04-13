import mongoose, { Require_id } from "mongoose";
import { Feedback, FeedbackModel } from "../db/schemas/feedback.schema";

type FeedbackWithId = Feedback & Require_id<Feedback>;

export const upsertFeedbacks = async (recommendedItemIds: string[],
                                      chosenItemId: string,
                                      userId: mongoose.Types.ObjectId) => {
    const updatedFeedbacks: Feedback[] = await calculateUpdatedFeedbacks(recommendedItemIds, chosenItemId, userId);

    await FeedbackModel.bulkWrite(updatedFeedbacks.map(feedback => ({
        updateOne: {
            filter: {_id: feedback.id},
            update: {$set: feedback},
            upsert: true
        }
    })));
    console.log(`Updated feedbacks: ${JSON.stringify(updatedFeedbacks)}`);
};

const calculateUpdatedFeedbacks: (recommendedItemIds: string[],
                                  chosenItemId: string,
                                  userId: mongoose.Types.ObjectId) => Promise<Feedback[]> = async (recommendedItemIds, chosenItemId, userId) => {
    const itemIdToUserFeedbackRecord: Record<string, FeedbackWithId> = (await FeedbackModel
        .find({userId, itemId: {$in: recommendedItemIds.map(id => new mongoose.Types.ObjectId(id))}})
        .lean()
        .exec())
        .reduce((acc: Record<string, FeedbackWithId>, feedback: FeedbackWithId) => ({
            ...acc,
            [feedback.itemId.toString()]: feedback
        }), {});

    return recommendedItemIds.map((currentItemId: string) => {
        const existingItemFeedback: FeedbackWithId | undefined = itemIdToUserFeedbackRecord[currentItemId];
        const updatedFeedback: Feedback = {
            id: existingItemFeedback?._id || new mongoose.Types.ObjectId(),
            itemId: new mongoose.Types.ObjectId(currentItemId),
            userId,
            positiveCounter: existingItemFeedback?.positiveCounter || 0,
            negativeCounter: existingItemFeedback?.negativeCounter || 0
        };

        updatedFeedback.positiveCounter += (currentItemId === chosenItemId ? 1 : 0);
        updatedFeedback.negativeCounter += (currentItemId === chosenItemId ? 0 : 1);

        return updatedFeedback;
    });
}