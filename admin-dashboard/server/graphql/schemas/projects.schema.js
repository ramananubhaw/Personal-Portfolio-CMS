export const projectTypeDefs = `
    type Project {
        name: String!
        description: String!
        techStack: [String!]!
        link: String!
        deployment: String
    }

    input ProjectInput {
        name: String!
        description: String!
        techStack: [String!]!
        link: String!
        deployment: String
    }

    input ProjectUpdateInput {
        description: String
        techStack: [String]
        link: String
        deployment: String
    }

    extend type Query {
        getProject(name: ID!): Project
        getAllProjects: [Project]
    }

    extend type Mutation {
        createProject(input: ProjectInput!): Project
        updateProject(name: ID!, input: ProjectUpdateInput!): Project
        deleteProject(name: ID!): DeleteResponse
    }
`;
