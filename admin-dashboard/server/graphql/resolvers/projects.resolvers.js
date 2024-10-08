import projects from '../../models/projects.model.js';

export const projectResolvers = {
    Query: {
        getProject: async (_, {name}) => {
            try {
                const project = await projects.findOne({name: name});
                if (!project) {
                    throw new Error("Project with this name not added");
                }
                return project;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        getAllProjects: async () => {
            try {
                const allProjects = await projects.find();
                if (allProjects.length === 0) {
                    throw new Error("No projects found");
                }
                return allProjects;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    },

    Mutation: {
        createProject: async (_, {input}) => {
            try {
                const project = await projects.findOne({name: input.name});
                if (project) {
                    throw new Error("Project with this name already added.");
                }
                await projects.create(input);
                return input;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        updateProject: async (_, {name, input}) => {
            try {
                const project = await projects.findOne({name: name});
                if (!project) {
                    throw new Error("Project not added");
                }
                for (const key in input) {
                    if (input[key] === project[key]) {
                        delete input[key];
                    }
                }
                if (Object.keys(input).length === 0) {
                    throw new Error("No update requested");
                }
                const updatedProject = await projects.findOneAndUpdate({name: name}, input, {new: true});
                return updatedProject;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteProject: async (_, {name}) => {
            try {
                const project = await projects.findOne({ name: name });
                if (!project) {
                    throw new Error("Project not added");
                }
                await projects.findOneAndDelete({name: name});
                return { deleted: true, message: "Project removed from portfolio" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
}