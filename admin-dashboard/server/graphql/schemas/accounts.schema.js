export const accountTypeDefs = `
    type Account {
        platform: String!
        username: String!
        link: String!
    }

    input AccountInput {
        platform: String!
        username: String!
        link: String!
    }

    input AccountUpdateInput {
        username: String
        link: String
    }

    extend type Query {
        getAccount(platform: ID!, username: ID!): Account
        getAllAccounts: [Account]
    }

    extend type Mutation {
        addAccount(input: AccountInput!): Account
        updateAccount(platform: ID!, input: AccountUpdateInput!): Account
        deleteAccount(platform: ID!): DeleteResponse
    }
`;
