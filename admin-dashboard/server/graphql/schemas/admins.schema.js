export const adminTypeDefs = `
    type Admin {
        name: String!
        email: String!
        hashedPassword: String
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

    input AdminUpdateInput {
        name: String
        email: String
        dob: String
        phone: String
        country: String
        password: String
    }

    extend type Query {
        getAdmin(email: String!): Admin
        getAllAdmins: [Admin]
    }

    extend type Mutation {
        createAdmin(input: AdminInput!): Admin
        updateAdmin(email: ID!, input: AdminUpdateInput!): Admin
        deleteAdmin(email: ID!): DeleteResponse
    }
`;
