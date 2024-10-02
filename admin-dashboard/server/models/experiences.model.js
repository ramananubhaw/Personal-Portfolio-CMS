import mongoose from "mongoose";

function wordCount(value) {
    return value.split(' ').filter(word => word.length > 0).length <= 50;
}

const experienceSchema = new mongoose.Schema({
    mode: {
        type: String,
        required: true,
        enum: ['On-site', 'Remote']
    },
    role: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Full-time', 'Internship', 'Contractual', 'Freelance', 'Club']
    },
    company_name: {
        type: String,
        required: true
    },
    duration: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: function () {
                return !this.isCurrent;
            }
        },
        isCurrent: {
            type: Boolean,
            default: false
        }
    },
    company_address: {
        type: String,
        required: true,
        validate: {
            validator: wordCount,
            message: "Company address should not be more than 50 words."
        }
    }
});

const experiences = mongoose.model('experiences', experienceSchema);

export default experiences;