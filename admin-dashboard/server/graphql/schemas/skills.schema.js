export const skillTypeDefs = `
    type Skill {
        id: ID!
        name: String!
        category: String!
        certifications: [String]
    }

    input SkillInput {
        name: String!
        category: String!
        certifications: [String]
    }

    input SkillUpdateInput {
        category: String
        certification: [String]
    }

    extend type Query {
        getSkill(name: ID!): Skill
        getAllSkills: [Skill]
    }

    extend type Mutation {
        createSkill(input: SkillInput!): Skill
        updateSkill(name: ID!, input: SkillUpdateInput!): Skill
        deleteSkill(name: ID!): DeleteResponse
    }
`;
