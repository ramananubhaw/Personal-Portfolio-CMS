import { gql } from "@apollo/client";

export const getAllAccounts = gql`
    query GetAllAccounts {
        getAllAccounts {
            platform
            username
            link
        }
    }
`;