import mongoose from "mongoose";
import { IUser, UserModel } from "../schemas/user.schema";
import { getOrderedCategories } from "./categories.dal";

interface UserDetails {
    email: string,
    username: string,
    gender: string,
    age: number,
    password: string,
    orderedCategoryIds: mongoose.Types.ObjectId[]
}

const filteredUserDetails = (user: IUser | null): Partial<IUser> | null => {
    const userDetails: Partial<IUser> | null = JSON.parse(JSON.stringify(user)); // deep copy
    delete userDetails?.password;
    delete userDetails?.refreshTokens;
    return userDetails;
}

export const getUserDetails = async (userId: mongoose.Types.ObjectId): Promise<Partial<IUser> | null> => {
    const response = await UserModel.findById(userId);
    return filteredUserDetails(response);
}

export const setUserDetails = async (userId: mongoose.Types.ObjectId, userDetails: Partial<UserDetails>): Promise<Partial<IUser> | null> => {
    const response = await UserModel.findByIdAndUpdate(
        userId,
        userDetails,
        { new: true }
    );
    return filteredUserDetails(response);
}

export const resetOrderedCategories = async (): Promise<void> => {
    const defaultOrderCategoryIds: mongoose.Types.ObjectId[] = (await getOrderedCategories())
        .map(category => category.id!);

    await UserModel.updateMany(
        {},
        { $set: { orderedCategoryIds: defaultOrderCategoryIds }},
        { upsert: true }
    );
}