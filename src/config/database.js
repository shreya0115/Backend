import mongoose from "mongoose";

const connectDB = async (retries = 3) => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not configured.");
    }

    for (let attempt = 1; attempt <= retries; attempt += 1) {
        try {
            const connectionInstance = await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 15000
            });
            console.log(`MongoDB connected !!! ${connectionInstance.connection.host}`);
            return connectionInstance;
        } catch (error) {
            console.error(
                `MongoDB connection attempt ${attempt}/${retries} failed:`,
                error.message
            );

            if (attempt < retries) {
                console.log("Retrying MongoDB connection...");
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }

    throw new Error("MongoDB connection failed.");
};

export default connectDB;