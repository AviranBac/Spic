import mongoose from "mongoose";
import { UserModel, IUser } from "../schemas/user.schema";

interface UserDetails {
    email?: string,
    username?: string,
    gender?: string, 
    age?: number,
    password? : string
}

const filteredUserDetails = (user : IUser | null) : Partial<IUser> | null => {
    const userDetails : Partial<IUser> | null = JSON.parse(JSON.stringify(user)); // deep copy
    delete userDetails?.password;
    delete userDetails?.refreshTokens;
    return userDetails;
}

export const getUserDetails = async (userId: mongoose.Types.ObjectId): Promise<Partial<IUser> | null> => {
    const response = await UserModel.findById(userId);
    return filteredUserDetails(response);
}

export const setUserDetails = async (userId: mongoose.Types.ObjectId, userDetails: UserDetails): Promise<Partial<IUser> | null> => {
    const response = await UserModel.findOneAndUpdate(
        { userId },
        userDetails,
        { new: true }
    );
    return filteredUserDetails(response);
}