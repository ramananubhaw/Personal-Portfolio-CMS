import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Frontend Development', 'Backend Development', 'Database Management', 'Full-stack Development', 'DevOps', 'AI/ML/DL', 'Data Science', 'Blockchain', 'Programming Language(s)', 'CyberSecurity', 'Other' ]
    },
    certifications: {
        type: [String]
    }
});

const skills = mongoose.model('skills', skillSchema);

export default skills;