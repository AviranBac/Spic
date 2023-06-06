jest.mock("../src/routes/auth.routes");
jest.mock("../src/routes/user.routes");
jest.mock("../src/db/mongo-connection");
jest.mock("../src/routes/items.routes");
jest.mock("../src/routes/photos.routes");
jest.mock('../src/routes/text-to-speech.routes');

import request from "supertest";
import { describe, expect, test, jest, beforeAll, afterEach } from '@jest/globals';
import { app } from "../src/server/app";
import * as jwtUtils from "../src/utils/jwt";
import mongoose from "mongoose";
import {
    addFavoriteItem,
    getFavoriteItemsByUserId,
    removeFavoriteItem,
    updateOrderedFavoriteItemIds
} from "../src/db/dal/user-preferences/ordered-favorites.dal";

jest.mock("../src/server/server", () => ({
    initializeApplication: jest.fn()
}));

jest.mock("../src/db/dal/user-preferences/ordered-favorites.dal", () => ({
    addFavoriteItem: jest.fn().mockImplementation(() => Promise.resolve([])),
    getFavoriteItemsByUserId: jest.fn().mockImplementation(() => Promise.resolve([])),
    removeFavoriteItem: jest.fn().mockImplementation(() => Promise.resolve([])),
    updateOrderedFavoriteItemIds: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

jest.mock("../src/validation/favorite.validation", () => ({
    validateFavoriteItemRequest: jest.fn().mockReturnValue([]),
    validateFavoritesOrderRequest: jest.fn().mockReturnValue([])
}));

let accessToken = '';

beforeAll(() => {
    const testId = new mongoose.Types.ObjectId();
    const { access_token } = jwtUtils.signToken(`${testId}`);
    accessToken = access_token;
});

afterEach(() => { jest.clearAllMocks() });

describe('Favorites Routes', () => {
    test('Get /favorites', async () => {
        const res: any = await request(app).get("/favorites").set("Authorization", `Bearer ${accessToken}`).send();
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(getFavoriteItemsByUserId).toHaveBeenCalledTimes(1);
    });

    test('Post /favorites - Add favorite', async () => {
        const itemId = new mongoose.Types.ObjectId();
        const res: any = await request(app).post("/favorites").set("Authorization", `Bearer ${accessToken}`).send({ itemId, action: 'ADD' });
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(addFavoriteItem).toHaveBeenCalledTimes(1);
    });

    test('Post /favorites - Remove favorite', async () => {
        const itemId = new mongoose.Types.ObjectId();
        const res: any = await request(app).post("/favorites").set("Authorization", `Bearer ${accessToken}`).send({ itemId, action: 'REMOVE' });
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(removeFavoriteItem).toHaveBeenCalledTimes(1);
    });

    test('Put /favorites/order', async () => {
        const res: any = await request(app).put("/favorites/order").set("Authorization", `Bearer ${accessToken}`).send({ orderedFavoriteItemIds: ['646bbb18e7172a753df3032b', '646bbb18e7172a753df3032c'] });
        expect(res).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(updateOrderedFavoriteItemIds).toHaveBeenCalledTimes(1);
        expect(getFavoriteItemsByUserId).toHaveBeenCalledTimes(1);
    });
});