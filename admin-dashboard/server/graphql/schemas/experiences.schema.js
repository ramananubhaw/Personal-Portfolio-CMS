export const experienceTypeDefs = `
    type Experience {
        serialNo: Int!
        mode: String!
        role: String!
        category: String!
        companyName: String!
        duration: Duration!
        companyAddress: String!
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
        serialNo: Int!
        mode: String!
        role: String!
        category: String!
        companyName: String!
        duration: DurationInput!
        companyAddress: String!
    }

    input ExperienceUpdateInput {
        mode: String
        role: String
        category: String
        companyName: String
        duration: DurationInput
        companyAddress: String
    }

    extend type Query {
        getAllExperiences: [Experience]
    }

    extend type Mutation {
        createExperience(input: ExperienceInput!): Experience
        updateExperience(serialNo: Int!, input: ExperienceUpdateInput!): Experience
        deleteExperience(serialNo: Int!): DeleteResponse
    }
`;
