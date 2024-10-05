export const adminTypeDefs = `
    type Admin {
        id: ID!
        name: String!
        email: String!
        dob: String!
        phone: String!
        country: String!
    }

    input AdminInput {
        name: String!
        email: String!
        dob: String!
        phone: String!
        country: String!
        password: String!
    }

    extend type Query {
        getAdmin(id: ID!): Admin
        getAllAdmins: [Admin]
    }

    extend type Mutation {
        createAdmin(input: AdminInput!): Admin
        updateAdmin(id: ID!, input: AdminInput!): Admin
        deleteAdmin(id: ID!): Boolean
    }
`;
