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