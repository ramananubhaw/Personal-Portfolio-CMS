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

    input AdminLoginInput {
        username: ID!
        password: String!
    }
    
    type LoginResponse {
        message: String!
        loggedIn: Boolean!
    }

    type LogoutResponse {
        message: String!
        loggedOut: Boolean!
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
        getAdmin: Admin
        getAllAdmins: [Admin]
    }

    extend type Mutation {
        createAdmin(input: AdminInput!): Admin
        updateAdmin(input: AdminUpdateInput!): Admin
        deleteAdmin(email: ID!): DeleteResponse
        adminLogin(input: AdminLoginInput!): LoginResponse
        adminLogout: LogoutResponse
    }
`;
