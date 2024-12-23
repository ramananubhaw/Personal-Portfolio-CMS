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
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\/[a-zA-Z0-9-]+)*\/?$/.test(v);
            },
            message: 'Please enter a valid URL.'
        }
    }
});

const accounts = mongoose.model('accounts', accountSchema);

export default accounts;
