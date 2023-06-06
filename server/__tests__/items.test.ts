import request from "supertest";
import mongoose from "mongoose";
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { app } from "../src/server/app";
import * as jwtUtils from "../src/utils/jwt";
import { getCommonlyUsedItems } from "../src/services/commonly-used-items";
import { getItemsByCategoryAndUserId, ItemWithCategory } from "../src/db/dal/items.dal";
import { Item } from '../src/db/schemas/item.schema';
import HttpStatus from "http-status-codes";
import { addRecord } from "../src/db/dal/chosen-item-records.dal";
import { upsertFeedbacks } from "../src/services/feedback";

const convertObjectIdsToString = (items: Item[] | ItemWithCategory[]) => {
    return items.map((item: Item | ItemWithCategory) => ({
            ...item,
            ...((item as ItemWithCategory)._id && {_id: item.id!.toString()}),
            id: item.id!.toString(),
            userId: item.userId?.toString(),
            categoryId: item.categoryId.toString(),
            ...((item as ItemWithCategory).category && {
                category: {
                    ...(item as ItemWithCategory).category,
                    id: (item as ItemWithCategory).category.id!.toString()
                }
            })
        }
    ));
}

const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
const {access_token: accessToken} = jwtUtils.signToken(`${userId}`);

jest
    .useFakeTimers()
    .setSystemTime(new Date('2023-06-06'));

jest.mock("../src/server/server", () => ({
    initializeApplication: jest.fn()
}));

const categoryId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
const mockedItems: Item[] = [
    {
        id: new mongoose.Types.ObjectId('646bbb18e7172a753df3032a'),
        name: 'אייטם 1',
        userId,
        categoryId,
        imageUrl: 'https://test.com'
    }
];
const mockedCommonlyUsedItems: ItemWithCategory[] = [
    {
        ...mockedItems[0],
        _id: mockedItems[0].id!,
        category: {
            id: mockedItems[0].categoryId,
            name: 'קטגוריה 1',
            imageUrl: 'https://test.com',
            sentenceBeginning: ''
        }
    }
];

jest.mock("../src/services/commonly-used-items", () => ({
    getCommonlyUsedItems: jest.fn().mockImplementation(() => Promise.resolve(mockedCommonlyUsedItems))
}));

jest.mock("../src/db/dal/items.dal", () => ({
    getItemsByCategoryAndUserId: jest.fn().mockImplementation(() => Promise.resolve(mockedItems))
}));

jest.mock("../src/services/feedback", () => ({
    upsertFeedbacks: jest.fn().mockImplementation(() => Promise.resolve())
}));

jest.mock("../src/db/dal/chosen-item-records.dal", () => ({
    addRecord: jest.fn().mockImplementation(() => Promise.resolve())
}));

jest.mock("../src/validation/items.validation", () => ({
    validateRecordRequest: jest.fn().mockReturnValue([]),
    validateAddItemRequest: jest.fn().mockReturnValue([]),
    validateDeleteItemRequest: jest.fn().mockReturnValue([]),
    validateEditItemRequest: jest.fn().mockReturnValue([]),
    validateItemOrderRequest: jest.fn().mockReturnValue([]),
}));

afterEach(() => {
    jest.clearAllMocks()
});

describe('Items Routes', () => {
    test('Get /items/commonlyUsed', async () => {
        const res = await request(app)
            .get("/items/commonlyUsed")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(convertObjectIdsToString(mockedCommonlyUsedItems));
        expect(getCommonlyUsedItems).toHaveBeenCalledWith(userId, new Date());
    });

    test('Get /items/:categoryId', async () => {
        const res = await request(app)
            .get(`/items/${categoryId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(convertObjectIdsToString(mockedItems));
        expect(getItemsByCategoryAndUserId).toHaveBeenCalledWith(categoryId, userId);
    });

    test('Post /items/record', async () => {
        const itemId: string = new mongoose.Types.ObjectId().toString();
        const requestTime: string = new Date().toString();
        const recommendedItemIds: string[] = [itemId];

        const res = await request(app)
            .post("/items/record")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({itemId, requestTime, recommendedItemIds});

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual({});
        expect(addRecord).toHaveBeenCalledWith({itemId: new mongoose.Types.ObjectId(itemId), userId, requestTime});
        expect(upsertFeedbacks).toHaveBeenCalledWith(recommendedItemIds, itemId, userId)
    });
});
