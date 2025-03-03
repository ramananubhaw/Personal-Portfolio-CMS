import mongoose from "mongoose";

function wordCount(value) {
    return value.split(' ').filter(word => word.length > 0).length <= 50;
}

function isValidGitHubURL(value) {
    if (value!==null) {
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/?$/;
        return githubRegex.test(value);
    }
    return true;
}

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: wordCount,
            message: "Description should be 50 words or less."
        }
    },
    techStack: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        validate: {
            validator: isValidGitHubURL,
            message: "Link must be a valid GitHub URL."
        }
    },
    deployment: {
        type: String
    }
});

const projects = mongoose.model('projects', projectSchema);

export default projects;