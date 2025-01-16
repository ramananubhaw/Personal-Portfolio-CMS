import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true,
    }
});

const accounts = mongoose.model('accounts', accountSchema);

export default accounts;
