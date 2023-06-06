import request from "supertest";
import mongoose from "mongoose";
import { describe, expect, test, jest, beforeAll, afterEach } from '@jest/globals';
import { app } from "../src/server/app";
import * as jwtUtils from "../src/utils/jwt";
import { getCommonlyUsedItems } from "../src/services/commonly-used-items";
import { getItemsByCategoryAndUserId } from "../src/db/dal/items.dal";
import { validateRecordRequest } from "../src/validation/items.validation";

jest.mock("../src/server/server", () => ({
    initializeApplication: jest.fn()
}));

jest.mock("../src/services/commonly-used-items", () => ({
    getCommonlyUsedItems: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

jest.mock("../src/services/feedback", () => ({
    upsertFeedbacks: jest.fn().mockImplementation(() => Promise.resolve())
}));

jest.mock("../src/db/dal/chosen-item-records.dal", () => ({
    addRecord: jest.fn().mockImplementation(() => Promise.resolve())
}));

jest.mock("../src/db/dal/items.dal", () => ({
    addItem: jest.fn().mockImplementation(() => Promise.resolve()),
    getItemsByCategoryAndUserId: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

jest.mock("../src/validation/items.validation", () => ({
    validateRecordRequest: jest.fn().mockReturnValue([]),
    validateAddItemRequest: jest.fn().mockReturnValue([]),
    validateDeleteItemRequest: jest.fn().mockReturnValue([]),
    validateEditItemRequest: jest.fn().mockReturnValue([]),
    validateItemOrderRequest: jest.fn().mockReturnValue([]),
}));

jest.mock("../src/db/dal/user-preferences/ordered-items-per-category.dal", () => ({
    addItemToPerCategoryPreferences:jest.fn().mockImplementation(() => Promise.resolve()),
}));

let accessToken = '';

beforeAll(() => {
    const testId = new mongoose.Types.ObjectId();
    const { access_token } = jwtUtils.signToken(`${testId}`);
    accessToken = access_token;
});

afterEach(() => { jest.clearAllMocks() });

describe('Items Routes', () => {
    test('Get /items/commonlyUsed', async () => {
        const res: any = await request(app).get("/items/commonlyUsed").set("Authorization", `Bearer ${accessToken}`).send();
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(getCommonlyUsedItems).toHaveBeenCalledTimes(1);
    });

    test('Get /items/:categoryId', async () => {
        const res: any = await request(app).get("/items/646bbb18e7172a753df3032b").set("Authorization", `Bearer ${accessToken}`).send({orderedCategoryIds: ['646bbb18e7172a753df3032b', '646bbb18e7172a753df3032c']});
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(getItemsByCategoryAndUserId).toHaveBeenCalledTimes(1);
    });

    test('Post /items/record', async () => {
        const res: any = await request(app).post("/items/record").set("Authorization", `Bearer ${accessToken}`).send({
            itemId: '646bbb18e7172a753df3032b',
            requestTime: new Date(),
            recommendedItemIds: ['646bbb18e7172a753df3032d', '646bbb18e7172a753df3032c']
        });
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
    });
});
