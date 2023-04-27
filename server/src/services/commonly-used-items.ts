import mongoose from "mongoose";
import { ChosenItemRecord } from "../db/schemas/chosen-item-record.schema";
import { getUserRecords } from "../db/dal/chosen-item-records.dal";
import { Feedback } from "../db/schemas/feedback.schema";
import { FeedbackWithId, getFeedbacksByUserIdAndItemIds } from "../db/dal/feedbacks.dal";
import { getItemsById, ItemWithCategory } from "../db/dal/items.dal";

const SLIDING_WINDOW_SIZE = 1.5 * 60 * 60 * 1000; // 1.5 hours
const POSITIVE_FEEDBACK_MULTIPLIER = 1;
const NEGATIVE_FEEDBACK_MULTIPLIER = -0.1;
const MAXIMUM_SUGGESTED_ITEMS_AMOUNT = 10;

interface WeightMetadata {
    itemId: string,
    requestTime: Date,
    frequencyWeight: number,
    recencyWeight: number,
    timeOfDayWeight: number,
    feedbackWeight: number
}

export const getCommonlyUsedItems: (userId: mongoose.Types.ObjectId, currentTime: Date) => Promise<ItemWithCategory[]> = async (userId, currentTime) => {
    const userRecords: ChosenItemRecord[] = await getUserRecords(userId);

    // Count the frequency of each record
    const frequencies: Record<string, number> = getFrequencies(userRecords);

    // Sort the records for the user by request time
    const userRecordsSortedByRequestTime: ChosenItemRecord[] = userRecords
        .sort((record1, record2) => record1.requestTime.getTime() - record2.requestTime.getTime());
    const uniqueUserRecordsMap: Map<string, ChosenItemRecord> = new Map(userRecordsSortedByRequestTime.map(record => [record.itemId.toString(), record]));
    const uniqueItemIds: mongoose.Types.ObjectId[] = Array.from(uniqueUserRecordsMap.keys()).map(id => new mongoose.Types.ObjectId(id));
    const uniqueUserRecords: ChosenItemRecord[] = Array.from(uniqueUserRecordsMap.values());

    const weightsBySlidingTimeWindow: Record<string, number> = getWeightsBySlidingTimeWindow(userRecords, uniqueUserRecords, currentTime);

    const userFeedbacks: FeedbackWithId[] = await getFeedbacksByUserIdAndItemIds(userId, uniqueItemIds);

    const weightMetadatas: WeightMetadata[] = uniqueUserRecords.map((record: ChosenItemRecord) => {
        const optionalRecordFeedback: FeedbackWithId | undefined = userFeedbacks.find(feedbackRecord => feedbackRecord.itemId.toString() === record.itemId.toString());
        const feedbackValue: number = optionalRecordFeedback ? calculateFeedbackValue(optionalRecordFeedback) : 0;
        return getWeightMetadata(frequencies, weightsBySlidingTimeWindow, record, currentTime, feedbackValue);
    });
    const normalizedWeightMetadatas: WeightMetadata[] = normalizeWeights(weightMetadatas);
    console.log(normalizedWeightMetadatas);

    return await getSortedCommonlyUsedItems(normalizedWeightMetadatas);
}

const getFrequencies = (userRecords: ChosenItemRecord[]): Record<string, number> => {
    const frequencies: Record<string, number> = {};
    for (const {itemId} of userRecords) {
        frequencies[itemId.toString()] = frequencies[itemId.toString()] || 0;
        frequencies[itemId.toString()]++;
    }

    return frequencies;
}

const getWeightsBySlidingTimeWindow = (userRecords: ChosenItemRecord[],
                                       uniqueUserRecords: ChosenItemRecord[],
                                       currentTime: Date): Record<string, number> => {
    // Assign weights to each action based on a sliding time window of 1.5 hours
    const weightsBySlidingTimeWindow: Record<string, number> = {};
    for (const record of uniqueUserRecords) {
        const itemId: string = record.itemId.toString();
        weightsBySlidingTimeWindow[itemId] = weightsBySlidingTimeWindow[itemId] || 0;

        // Count the number of occurrences of the same action in the sliding time window around the request time
        weightsBySlidingTimeWindow[itemId] = userRecords
            .filter(currRecord => currRecord.itemId.toString() === itemId)
            .filter(currRecord => {
                const {requestTime} = currRecord;
                const currRecordTimeOfDayEpoch = new Date()
                    .setHours(requestTime.getHours(), requestTime.getMinutes(), requestTime.getSeconds(), requestTime.getMilliseconds());
                return Math.abs(currentTime.getTime() - currRecordTimeOfDayEpoch) <= SLIDING_WINDOW_SIZE;
            })
            .length;
    }

    return weightsBySlidingTimeWindow;
};

const getWeightMetadata = (frequencies: Record<string, number>,
                           weightsBySlidingTimeWindow: Record<string, number>,
                           record: ChosenItemRecord,
                           currentTime: Date,
                           feedbackValue: number): WeightMetadata => {
    const itemId: string = record.itemId.toString();
    const {requestTime}: { requestTime: Date } = record;

    const frequencyWeight: number = frequencies[itemId];

    // 1000 * 60 * 60 * 24 is not mandatory, but it's recommended.
    // Without this conversion, the recency weight would decrease very rapidly as the time difference increases,
    // resulting in very small weight values for actions that were performed even a few days ago.
    const recencyWeight: number = Math.exp(-1 * (currentTime.getTime() - requestTime.getTime()) / (1000 * 60 * 60 * 24));
    const timeOfDayWeight: number = weightsBySlidingTimeWindow[itemId];

    // Feedback weight - sigmoid. Check in the future if we need to update the parameters: Math.exp(-k * (x - x0))
    // k - steepness parameter, how quickly the function changes from 0 to 1. Larger values of k result in a steeper curve.
    // x0: The midpoint parameter, which determines the value of x at which the function has a value of 0.5. Larger values of x0 shift the curve to the right.
    const feedbackWeight: number = 1 / (1 + Math.exp(-1 * feedbackValue));

    const weightMetadata: WeightMetadata = {
        itemId,
        requestTime,
        frequencyWeight,
        recencyWeight,
        timeOfDayWeight,
        feedbackWeight
    };

    console.log(weightMetadata);
    return weightMetadata;
};

const calculateFeedbackValue = (feedback: Feedback): number => {
    return POSITIVE_FEEDBACK_MULTIPLIER * (feedback.positiveCounter) +
        NEGATIVE_FEEDBACK_MULTIPLIER * (feedback.negativeCounter);
}

const normalizeWeights = (weightMetadatas: WeightMetadata[]): WeightMetadata[] => {
    const minFrequencyWeight: number = Math.min(...weightMetadatas.map(metadata => metadata.frequencyWeight));
    const maxFrequencyWeight: number = Math.max(...weightMetadatas.map(metadata => metadata.frequencyWeight));
    const minTimeOfDayWeight: number = Math.min(...weightMetadatas.map(metadata => metadata.timeOfDayWeight));
    const maxTimeOfDayWeight: number = Math.max(...weightMetadatas.map(metadata => metadata.timeOfDayWeight));

    return weightMetadatas.map((metadata: WeightMetadata) => ({
        ...metadata,
        frequencyWeight: minMaxNormalize(metadata.frequencyWeight, maxFrequencyWeight, minFrequencyWeight, 1, Number.EPSILON),
        timeOfDayWeight: minMaxNormalize(metadata.timeOfDayWeight, maxTimeOfDayWeight, minTimeOfDayWeight, 1, Number.EPSILON)
    }));
}

const minMaxNormalize = (valueToNormalize: number, maxValue: number, minValue: number, desiredMaxValue: number, desiredMinValue: number): number => {
    if (minValue === maxValue) {
        return desiredMaxValue;
    }

    const normalizedValue: number = (valueToNormalize - minValue) / (maxValue - minValue) * (desiredMaxValue - desiredMinValue) + desiredMinValue;
    return Math.min(normalizedValue, desiredMaxValue);
};

const getSortedCommonlyUsedItems = async (normalizedWeightMetadatas: WeightMetadata[]): Promise<ItemWithCategory[]> => {
    const sortedCommonlyUsedItemIds: mongoose.Types.ObjectId[] = normalizedWeightMetadatas
        .map((weightMetadata: WeightMetadata) => [
            new mongoose.Types.ObjectId(weightMetadata.itemId),
            calculateFinalWeight(weightMetadata),
        ] as [mongoose.Types.ObjectId, number])
        .sort(([itemId1, weight1], [itemId2, weight2]) => weight2 - weight1)
        .map(([itemId]) => itemId)
        .slice(0, MAXIMUM_SUGGESTED_ITEMS_AMOUNT);

    const unorderedItems: Record<string, ItemWithCategory> = (await getItemsById(sortedCommonlyUsedItemIds))
        .reduce((acc, itemWithCategory) => ({...acc, [itemWithCategory._id!.toString()]: itemWithCategory}), {});
    return sortedCommonlyUsedItemIds.map((itemId: mongoose.Types.ObjectId) => unorderedItems[itemId.toString()]);
}

const calculateFinalWeight = (weightMetadata: WeightMetadata): number => {
    return (weightMetadata.frequencyWeight * weightMetadata.recencyWeight * weightMetadata.timeOfDayWeight * weightMetadata.feedbackWeight);
}