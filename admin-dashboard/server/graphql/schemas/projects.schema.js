export const projectTypeDefs = `
    type Project {
        id: ID!
        name: String!
        description: String!
        tools_used: [String!]!
        link: String!
    }

    input ProjectInput {
        name: String!
        description: String!
        tools_used: [String!]!
        link: String!
    }

    extend type Query {
        getProject(id: ID!): Project
        getAllProjects: [Project]
    }

    extend type Mutation {
        createProject(input: ProjectInput!): Project
        updateProject(id: ID!, input: ProjectInput!): Project
        deleteProject(id: ID!): DeleteResponse
    }
`;
