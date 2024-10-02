import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const admins = mongoose.model('admins', adminSchema);

export default admins;