import mongoose from "mongoose";

export const initMongoConnection: () => Promise<void> = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/spic');
    console.log('Connected to MongoDB successfully');
};