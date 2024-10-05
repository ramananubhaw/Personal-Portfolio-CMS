export const experienceTypeDefs = `
    type Experience {
        id: ID!
        mode: String!
        role: String!
        category: String!
        company_name: String!
        duration: Duration!
        company_address: String!
    }

    type Duration {
        startDate: String!
        endDate: String
        isCurrent: Boolean!
    }

    input DurationInput {
        startDate: String!
        endDate: String
        isCurrent: Boolean!
    }

    input ExperienceInput {
        mode: String!
        role: String!
        category: String!
        company_name: String!
        duration: DurationInput!
        company_address: String!
    }

    extend type Query {
        getExperience(id: ID!): Experience
        getAllExperiences: [Experience]
    }

    extend type Mutation {
        createExperience(input: ExperienceInput!): Experience
        updateExperience(id: ID!, input: ExperienceInput!): Experience
        deleteExperience(id: ID!): Boolean
    }
`;
