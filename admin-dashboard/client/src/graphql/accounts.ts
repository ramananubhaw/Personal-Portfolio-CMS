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

export const addNewAccount = gql`
    mutation AddAccount($input: AccountInput!) {
        addAccount(input: $input) {
            link
            platform
            username
        }
    }
`;

export const updateAccount = gql`
    mutation UpdateAccount($platform: ID!, $input: AccountUpdateInput!) {
        updateAccount(platform: $platform, input: $input) {
            link
            platform
            username
        }
    }
`;