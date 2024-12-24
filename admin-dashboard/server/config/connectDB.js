import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 8000
        })
        console.log("MongoDB connected successfully.");
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
};