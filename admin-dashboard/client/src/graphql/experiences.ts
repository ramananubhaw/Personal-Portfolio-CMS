import { gql } from "@apollo/client";

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

export const addExperience = gql`
    mutation CreateExperience($input: ExperienceInput!) {
        createExperience(input: $input) {
            role
            mode
            category
            companyName
            companyAddress
            duration {
                startDate
                isCurrent
                endDate
            }
            serialNo
        }
    }
`;

export const updateExperience = gql`
    mutation UpdateExperience($serialNo: Int!, $input: ExperienceUpdateInput!) {
        updateExperience(serialNo: $serialNo, input: $input) {
            role
            mode
            category
            companyName
            companyAddress
            duration {
                startDate
                isCurrent
                endDate
            }
            serialNo
        }
    }
`;

export const deleteExperience = gql`
    mutation DeleteExperience($serialNo: Int!) {
        deleteExperience(serialNo: $serialNo) {
            message
            deleted
            id
        }
    }
`;