import { gql } from "@apollo/client";

export const getAllAccounts = gql`
    query GetAllAccounts {
        getAllAccounts {
            platform
            link
        }
    }
`;

export const getPersonalInfo = gql`
    query GetAllAdmins {
        admins {
            name
            email
            resumeLink
        }
    }
`;

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

export const getAllExperiences = gql`
    query GetAllExperiences {
        getAllExperiences {
            mode
            role
            category
            companyName
            companyAddress
            duration {
                startDate
                endDate
                isCurrent
            }
            serialNo
        }
    }
`;