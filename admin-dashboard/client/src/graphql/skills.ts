import { gql } from "@apollo/client"

export const getAllSkills = gql`
    query GetAllSkills {
        getAllSkills {
            name
            category
            certifications {
                name
                link
            }
        }
    }
`;