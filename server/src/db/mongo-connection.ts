import mongoose from "mongoose";

export const initMongoConnection: () => Promise<void> = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.q1n7xhk.mongodb.net/${process.env.DB_SCHEMA_NAME}?retryWrites=true&w=majority`);
    console.log('Connected to MongoDB successfully');
};