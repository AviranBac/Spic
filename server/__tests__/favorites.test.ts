import request from "supertest";
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { app } from "../src/server/app";
import * as jwtUtils from "../src/utils/jwt";
import mongoose from "mongoose";
import {
    addFavoriteItem,
    getFavoriteItemsByUserId,
    removeFavoriteItem,
    updateOrderedFavoriteItemIds
} from "../src/db/dal/user-preferences/ordered-favorites.dal";
import HttpStatus from "http-status-codes";
import { ItemWithCategory } from "../src/db/dal/items.dal";

const convertObjectIdsToString = (itemsWithCategories: ItemWithCategory[]) => {
    return itemsWithCategories.map((itemWithCategory: ItemWithCategory) => ({
        ...itemWithCategory,
        _id: itemWithCategory._id.toString(),
        userId: itemWithCategory.userId?.toString(),
        categoryId: itemWithCategory.categoryId.toString(),
        category: {
            ...itemWithCategory.category,
            id: itemWithCategory.category.id!.toString()
        }
    }))
}

const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
const {access_token: accessToken} = jwtUtils.signToken(`${userId}`);

jest.mock("../src/server/server", () => ({
    initializeApplication: jest.fn()
}));

const favoriteItemsMock: ItemWithCategory[] = [
    {
        _id: new mongoose.Types.ObjectId('646bbb18e7172a753df3032a'),
        userId,
        categoryId: new mongoose.Types.ObjectId('646bbb18e7172a753df3032c'),
        name: 'אייטם 1',
        imageUrl: 'https://test.com',
        category: {
            id: new mongoose.Types.ObjectId('646bbb18e7172a753df3032c'),
            name: 'קטגוריה 1',
            imageUrl: 'https://test.com',
            sentenceBeginning: ''
        }
    },
    {
        _id: new mongoose.Types.ObjectId('646bbb18e7172a753df3032b'),
        userId,
        categoryId: new mongoose.Types.ObjectId('646bbb18e7172a753df3032d'),
        name: 'אייטם 2',
        imageUrl: 'https://test.com',
        category: {
            id: new mongoose.Types.ObjectId('646bbb18e7172a753df3032d'),
            name: 'קטגוריה 2',
            imageUrl: 'https://test.com',
            sentenceBeginning: ''
        }
    }
];

const favoritesAfterAddition: mongoose.Types.ObjectId[] = [...favoriteItemsMock.map(({_id}) => _id), new mongoose.Types.ObjectId()];
const favoritesAfterRemoval: mongoose.Types.ObjectId[] = [...favoriteItemsMock.map(({_id}) => _id).slice(1)];
jest.mock("../src/db/dal/user-preferences/ordered-favorites.dal", () => ({
    addFavoriteItem: jest.fn().mockImplementation(() => Promise.resolve(favoritesAfterAddition)),
    getFavoriteItemsByUserId: jest.fn().mockImplementation(() => Promise.resolve(favoriteItemsMock)),
    removeFavoriteItem: jest.fn().mockImplementation(() => Promise.resolve(favoritesAfterRemoval)),
    updateOrderedFavoriteItemIds: jest.fn().mockImplementation(() => Promise.resolve(favoriteItemsMock))
}));

jest.mock("../src/validation/favorite.validation", () => ({
    validateFavoriteItemRequest: jest.fn().mockReturnValue([]),
    validateFavoritesOrderRequest: jest.fn().mockReturnValue([])
}));

afterEach(() => {
    jest.clearAllMocks()
});

describe('Favorites Routes', () => {
    test('Get /favorites', async () => {
        const res = await request(app)
            .get("/favorites")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(convertObjectIdsToString(favoriteItemsMock));
        expect(getFavoriteItemsByUserId).toHaveBeenCalledWith(userId);
    });

    test('Post /favorites - Add favorite', async () => {
        const itemId: mongoose.Types.ObjectId = favoritesAfterAddition[favoritesAfterAddition.length - 1];
        const res = await request(app)
            .post("/favorites")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({itemId: itemId.toString(), action: 'ADD'});

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(favoritesAfterAddition.map(id => id.toString()));
        expect(addFavoriteItem).toHaveBeenCalledWith(userId, itemId);
    });

    test('Post /favorites - Remove favorite', async () => {
        const itemId: mongoose.Types.ObjectId = favoriteItemsMock.map(({_id}) => _id)[0];
        const res = await request(app)
            .post("/favorites")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({itemId: itemId.toString(), action: 'REMOVE'});

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(favoritesAfterRemoval.map(id => id.toString()));
        expect(removeFavoriteItem).toHaveBeenCalledWith(userId, itemId);
    });

    test('Put /favorites/order', async () => {
        const orderedFavoriteItemIds: string[] = favoriteItemsMock.map(({_id}) => _id.toString());
        const res = await request(app)
            .put("/favorites/order")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({orderedFavoriteItemIds});

        expect(res).toBeTruthy();
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body).toEqual(convertObjectIdsToString(favoriteItemsMock));
        expect(updateOrderedFavoriteItemIds).toHaveBeenCalledWith(userId, orderedFavoriteItemIds.map(id => new mongoose.Types.ObjectId(id)));
        expect(getFavoriteItemsByUserId).toHaveBeenCalledWith(userId);
    });
});