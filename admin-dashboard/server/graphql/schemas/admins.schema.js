export const adminTypeDefs = `
    type Admin {
        name: String!
        email: String!
        hashedPassword: String
        dob: String!
        phone: String!
        country: String!
        resumeLink: String
    }

    input AdminInput {
        name: String!
        email: String!
        dob: String!
        phone: String!
        country: String!
        password: String!
        resumeLink: String
    }

    input AdminLoginInput {
        username: ID!
        password: String!
    }
    
    type LoginResponse {
        message: String!
        loggedIn: Boolean!
        status: Int!
    }

    type LogoutResponse {
        message: String!
        loggedOut: Boolean!
    }

    input AdminUpdateInput {
        name: String
        dob: String
        phone: String
        country: String
        resumeLink: String
    }

    extend type Query {
        admin: Admin
        admins: [Admin]
        isLoggedIn: Boolean!
    }

    extend type Mutation {
        createAdmin(input: AdminInput!): Admin
        updateAdmin(input: AdminUpdateInput!): Admin
        deleteAdmin(email: ID!): DeleteResponse
        adminLogin(input: AdminLoginInput!): LoginResponse
        adminLogout: LogoutResponse
    }
`;
