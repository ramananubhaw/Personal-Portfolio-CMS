import experiences from '../../models/experiences.model.js';

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
        createExperience: async (_, {input}) => {
            try {
                const experience = await experiences.findOne({serialNo: input.serialNo});
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

        updateExperience: async (_, {serialNo, input}) => {
            try {
                const experience = await experiences.findOne({serialNo: serialNo});
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
                const updatedExperience = await experiences.findOneAndUpdate({serialNo: serialNo}, input, {new: true});
                return updatedExperience;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteExperience: async (_, {serialNo}) => {
            try {
                const experience = await experiences.findOne({ serialNo: serialNo });
                if (!experience) {
                    throw new Error("Experience not added");
                }
                await experiences.findOneAndDelete({serialNo: serialNo});
                return { deleted: true, message: "Experience removed from portfolio" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
}