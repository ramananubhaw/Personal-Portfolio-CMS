import { adminResolvers } from "./resolvers/admins.resolvers.js";
import { experienceResolvers } from "./resolvers/experiences.resolvers.js";
import { accountResolvers } from "./resolvers/accounts.resolvers.js";
import { projectResolvers } from "./resolvers/projects.resolvers.js";
import { skillResolvers } from "./resolvers/skills.resolvers.js";

export const resolvers = [
    adminResolvers,
    experienceResolvers,
    accountResolvers,
    projectResolvers,
    skillResolvers
]