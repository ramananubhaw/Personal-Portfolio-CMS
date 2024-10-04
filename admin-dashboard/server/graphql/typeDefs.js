import { adminTypeDefs } from './schemas/admins.schema.js';
import { experienceTypeDefs } from './schemas/experiences.schema.js';
import { profileTypeDefs } from './schemas/profiles.schema.js';
import { projectTypeDefs } from './schemas/projects.schema.js';
import { skillTypeDefs } from './schemas/skills.schema.js';

const baseTypeDefs = `
    type Query
    type Mutation
`;

export const typeDefs = [
    baseTypeDefs,
    adminTypeDefs,
    experienceTypeDefs,
    profileTypeDefs,
    projectTypeDefs,
    skillTypeDefs
];
