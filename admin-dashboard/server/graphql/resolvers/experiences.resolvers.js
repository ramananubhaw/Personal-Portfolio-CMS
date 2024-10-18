import experiences from '../../models/experiences.model.js';
import { authenticateToken } from '../../middlewares/authenticateToken.js';

export const experienceResolvers = {
    Query: {
        getAllExperiences: async () => {
            try {
                const allExperiences = await experiences.find();
                if (allExperiences.length === 0) {
                    throw new Error("No experience");
                }
                return allExperiences;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    },

    Mutation: {
        createExperience: async (_, { input }, { req }) => {
            authenticateToken(req);
            try {
                const experience = await experiences.findOne({ serialNo: input.serialNo });
                if (experience) {
                    throw new Error("Experience already added.");
                }
                await experiences.create(input);
                return input;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        updateExperience: async (_, { serialNo, input }, { req }) => {
            authenticateToken(req);
            try {
                const experience = await experiences.findOne({ serialNo });
                if (!experience) {
                    throw new Error("Experience not added");
                }
                for (const key in input) {
                    if (input[key] === experience[key]) {
                        delete input[key];
                    }
                }
                if (Object.keys(input).length === 0) {
                    throw new Error("No update requested");
                }
                const updatedExperience = await experiences.findOneAndUpdate(
                    { serialNo },
                    input,
                    { new: true }
                );
                return updatedExperience;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteExperience: async (_, { serialNo }, { req }) => {
            authenticateToken(req);
            try {
                const experience = await experiences.findOne({ serialNo });
                if (!experience) {
                    throw new Error("Experience not added");
                }
                await experiences.findOneAndDelete({ serialNo });
                return { deleted: true, message: "Experience removed from portfolio" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
};
