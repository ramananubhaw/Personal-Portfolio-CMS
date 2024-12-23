import { gql } from "@apollo/client";

export const getAllProjects = gql`
    query GetAllProjects {
        projects {
            name
            description
            techStack
            link
            deployment
        }
    }
`;

export const addNewProject = gql`
    mutation CreateProject($input: ProjectInput!) {
        createProject(input: $input) {
            name
            description
            techStack
            link
            deployment
        }
    }
`;

export const updateProject = gql`
    mutation UpdateProject($name: ID!, $input: ProjectUpdateInput!) {
        updateProject(name: $name, input: $input) {
            name
            description
            techStack
            link
            deployment
        }
    }
`;