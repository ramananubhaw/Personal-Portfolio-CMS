import skills from '../../models/skills.model.js';
import { authenticateToken } from '../../middlewares/authenticateToken.js';

export const skillResolvers = {
    Query: {
        getSkill: async (_, { name }) => {
            try {
                const skill = await skills.findOne({ name });
                if (!skill) {
                    throw new Error("Skill not added");
                }
                return skill;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        getAllSkills: async () => {
            try {
                const allSkills = await skills.find();
                if (allSkills.length === 0) {
                    throw new Error("No skills found");
                }
                return allSkills;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    },

    Mutation: {
        createSkill: async (_, { input }, { req }) => {
            authenticateToken(req);
            try {
                const skill = await skills.findOne({ name: input.name });
                if (skill) {
                    throw new Error("Skill already added.");
                }
                const newSkill = await skills.create(input);
                return newSkill;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        updateSkill: async (_, { name, input }, { req }) => {
            authenticateToken(req);
            try {
                const skill = await skills.findOne({ name });
                if (!skill) {
                    throw new Error("Skill not added");
                }
                for (const key in input) {
                    if (input[key] === skill[key]) {
                        delete input[key];
                    }
                }
                if (Object.keys(input).length === 0) {
                    throw new Error("No update requested");
                }
                const updatedSkill = await skills.findOneAndUpdate({ name }, input, { new: true });
                return updatedSkill;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteSkill: async (_, { name }, { req }) => {
            authenticateToken(req);
            try {
                const skill = await skills.findOne({ name });
                if (!skill) {
                    throw new Error("Skill not added");
                }
                await skills.findOneAndDelete({ name });
                return { deleted: true, message: "Skill removed from portfolio" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
};