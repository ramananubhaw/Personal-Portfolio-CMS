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
        platform: String!
        username: String!
        link: String
    }

    extend type Query {
        getAccount(platform: ID!, username: ID!): Account
        getAllAccounts: [Account]
    }

    extend type Mutation {
        addAccount(input: AccountInput!): Account
        updateAccount(input: AccountUpdateInput!): Account
        deleteAccount(platform: ID!, username: ID!): DeleteResponse
    }
`;
