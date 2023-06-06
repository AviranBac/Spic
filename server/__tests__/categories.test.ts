jest.mock("../src/routes/auth.routes");
jest.mock("../src/routes/user.routes");
jest.mock("../src/routes/items.routes");
jest.mock("../src/db/mongo-connection");
jest.mock("../src/routes/photos.routes");
jest.mock("../src/routes/favorites.routes");
jest.mock('../src/routes/text-to-speech.routes');

import request from "supertest";
import mongoose from "mongoose";
import { describe, expect, test, jest, beforeAll, afterEach } from '@jest/globals';
import { app } from "../src/server/app";
import * as jwtUtils from "../src/utils/jwt";
import { getOrderedCategories } from '../src/db/dal/categories.dal';
import { updateOrderedCategoryIds } from "../src/db/dal/user-preferences/ordered-categories.dal";

jest.mock("../src/server/server", () => ({
    initializeApplication: jest.fn()
}));

jest.mock("../src/db/dal/categories.dal", () => ({
    getOrderedCategories: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

jest.mock("../src/db/dal/user-preferences/ordered-categories.dal", () => ({
    updateOrderedCategoryIds: jest.fn().mockImplementation(() => Promise.resolve())
}));

jest.mock("../src/validation/categories.validation", () => ({
    validateCategoriesOrderRequest: jest.fn().mockReturnValue([]),
}));

let accessToken = '';

beforeAll(() => {
    const testId = new mongoose.Types.ObjectId();
    const { access_token } = jwtUtils.signToken(`${testId}`);
    accessToken = access_token;
});

afterEach(() => { jest.clearAllMocks() });

describe('Categories Routes', () => {
    test('Get /categories', async () => {
        const res: any = await request(app).get("/categories").set("Authorization", `Bearer ${accessToken}`).send();
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(getOrderedCategories).toHaveBeenCalledTimes(1);
    });

    test('Put /categories/order', async () => {
        const res: any = await request(app).put("/categories/order").set("Authorization", `Bearer ${accessToken}`).send({orderedCategoryIds: ['646bbb18e7172a753df3032b', '646bbb18e7172a753df3032c']});
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(getOrderedCategories).toHaveBeenCalledTimes(1);
        expect(updateOrderedCategoryIds).toHaveBeenCalledTimes(1);
    });
});
