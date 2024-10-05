import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    certifications: {
        type: [String],
    }
});

const skills = mongoose.model('skills', skillSchema);

export default skills;