export const typeDefsDemo = `
    type User {
        name: String!
        username: String!
        email: String!
    }

    type Todo {
        userId: ID!
        id: ID!
        title: String!
        completed: Boolean
        user: User
    }

    type Query {
        getTodos: [Todo]
    }
`;