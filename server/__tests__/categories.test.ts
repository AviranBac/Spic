import request from "supertest";
import mongoose from "mongoose";
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { app } from "../src/server/app";
import * as jwtUtils from "../src/utils/jwt";
import { getOrderedCategories } from '../src/db/dal/categories.dal';
import { updateOrderedCategoryIds } from "../src/db/dal/user-preferences/ordered-categories.dal";
import HttpStatus from "http-status-codes";

const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
const {access_token: accessToken} = jwtUtils.signToken(`${userId}`);

jest.mock("../src/server/server", () => ({
    initializeApplication: jest.fn()
}));

const orderedCategoryIds: string[] = ['646bbb18e7172a753df3032c', '646bbb18e7172a753df3032d'];
jest.mock("../src/db/dal/categories.dal", () => ({
    getOrderedCategories: jest.fn().mockImplementation(() => Promise.resolve(orderedCategoryIds))
}));

jest.mock("../src/db/dal/user-preferences/ordered-categories.dal", () => ({
    updateOrderedCategoryIds: jest.fn().mockImplementation(() => Promise.resolve())
}));

jest.mock("../src/validation/categories.validation", () => ({
    validateCategoriesOrderRequest: jest.fn().mockReturnValue([]),
}));

afterEach(() => {
    jest.clearAllMocks()
});

describe('Categories Routes', () => {
    test('Get /categories', async () => {
        const res = await request(app)
            .get("/categories")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(orderedCategoryIds);
        expect(getOrderedCategories).toHaveBeenCalledWith(userId);
    });

    test('Put /categories/order', async () => {
        const res = await request(app)
            .put("/categories/order")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({orderedCategoryIds});

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(orderedCategoryIds);
        expect(updateOrderedCategoryIds).toHaveBeenCalledWith(
            userId,
            orderedCategoryIds.map(id => new mongoose.Types.ObjectId(id))
        );
        expect(getOrderedCategories).toHaveBeenCalledWith(userId);
    });
});
