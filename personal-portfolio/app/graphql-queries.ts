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
            phone
            resumeLink
        }
    }
`;