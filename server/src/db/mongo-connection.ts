import mongoose from "mongoose";

const mongooseUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.q1n7xhk.mongodb.net/?retryWrites=true&w=majority`;

export const initMongoConnection: () => Promise<void> = async () => {
    await mongoose.connect(mongooseUri, {dbName: process.env.DB_SCHEMA_NAME});
    console.log('Connected to MongoDB successfully');
};