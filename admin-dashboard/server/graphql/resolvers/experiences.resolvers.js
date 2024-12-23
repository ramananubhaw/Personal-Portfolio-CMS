import experiences from '../../models/experiences.model.js';
import { authenticateToken } from '../../middlewares/authenticateToken.js';
import { convertToDate } from '../../middlewares/convertToDate.js';

export const experienceResolvers = {
    Query: {
        getAllExperiences: async () => {
            try {
                const allExperiences = await experiences.find();
                if (allExperiences.length === 0) {
                    throw new Error("No experience");
                }
                const formattedExperiences = allExperiences.map((experience) => {
                    const duration = experience.duration || {};
        
                    return {
                        ...experience.toObject(),
                        duration: {
                            startDate: convertToDate(duration.startDate),
                            endDate: duration.endDate
                                ? convertToDate(duration.endDate)
                                : null,
                            isCurrent: duration.isCurrent,
                        }
                    };
                });
                return formattedExperiences;
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
                const lastExperience = await experiences.findOne().sort({serialNo: -1});
                const nextSerialNo = lastExperience ? lastExperience.serialNo + 1 : 1;
                input.serialNo = nextSerialNo;
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
                
                return {...updatedExperience.toObject(),
                    duration: {
                        ...updatedExperience.duration,
                        startDate: updatedExperience.duration.startDate ? convertToDate(updatedExperience.duration.startDate) : null,
                        endDate: updatedExperience.duration.endDate ? convertToDate(updatedExperience.duration.endDate) : null
                    }
                };
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
                const remainingExperiences = await experiences.find().sort({serialNo: 1});
                for (let i=0; i<remainingExperiences.length; i++) {
                    await experiences.updateOne({_id: remainingExperiences[i]._id}, {serialNo: i+1});
                }
                return { deleted: true, message: "Experience removed from portfolio" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
};
