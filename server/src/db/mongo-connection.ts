import mongoose from "mongoose";

const mongooseUri = 'mongodb+srv://spic:spic@cluster0.q1n7xhk.mongodb.net/?retryWrites=true&w=majority';

export const initMongoConnection: () => Promise<void> = async () => {
    await mongoose.connect(mongooseUri, {dbName: "spic"});
    console.log('Connected to MongoDB successfully');
};