export const skillTypeDefs = `

    type Certificate {
        name: ID!
        link: String!
    }

    type Skill {
        id: ID!
        name: String!
        category: String!
        certifications: [Certificate]
    }

    input CertificateInput {
        name: String!
        link: String!
    }

    input SkillInput {
        name: String!
        category: String!
        certifications: [CertificateInput]
    }

    input SkillUpdateInput {
        category: String
        certifications: [CertificateInput]
    }

    extend type Query {
        getSkill(name: String!): Skill
        getAllSkills: [Skill]
    }

    extend type Mutation {
        createSkill(input: SkillInput!): Skill
        updateSkill(name: String!, input: SkillUpdateInput!): Skill
        deleteSkill(name: String!): DeleteResponse
    }
`;
