export const skillTypeDefs = `
    type Skill {
        id: ID!
        name: String!
        category: String!
        experience: Int
        certifications: [String!]
    }

    input SkillInput {
        name: String!
        category: String!
        experience: Int
        certifications: [String!]
    }

    extend type Query {
        getSkill(id: ID!): Skill
        getAllSkills: [Skill]
    }

    extend type Mutation {
        createSkill(input: SkillInput!): Skill
        updateSkill(id: ID!, input: SkillInput!): Skill
        deleteSkill(id: ID!): DeleteResponse
    }
`;
