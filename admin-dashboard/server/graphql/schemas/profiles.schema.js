export const profileTypeDefs = `
    type Account {
        platform: String!
        link: String!
    }

    type Profile {
        id: ID!
        accountLinks: [Account!]!
    }

    input AccountInput {
        platform: String!
        link: String!
    }

    input ProfileInput {
        accountLinks: [AccountInput!]!
    }

    extend type Query {
        getProfile(id: ID!): Profile
        getAllProfiles: [Profile]
    }

    extend type Mutation {
        createProfile(input: ProfileInput!): Profile
        updateProfile(id: ID!, input: ProfileInput!): Profile
        deleteProfile(id: ID!): Boolean
    }
`;
