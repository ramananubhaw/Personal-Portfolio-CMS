import { adminTypeDefs } from './schemas/admins.schema.js';
import { experienceTypeDefs } from './schemas/experiences.schema.js';
import { accountTypeDefs } from './schemas/accounts.schema.js';
import { projectTypeDefs } from './schemas/projects.schema.js';
import { skillTypeDefs } from './schemas/skills.schema.js';

const baseTypeDefs = `
    type Query
    type Mutation
    type DeleteResponse {
        deleted: Boolean!
        message: String!
    }
`;

export const typeDefs = [
    baseTypeDefs,
    adminTypeDefs,
    experienceTypeDefs,
    accountTypeDefs,
    projectTypeDefs,
    skillTypeDefs
];
