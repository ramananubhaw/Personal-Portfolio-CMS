import { gql } from "@apollo/client";

export const personalInfoQuery = gql`
    query GetAdmin {
        admin {
            name
            email
            dob
            phone
            country
        }
    }
`;

export const adminLogin = gql`
    mutation AdminLogin($input: AdminLoginInput!) {
        adminLogin(input: $input) {
            loggedIn
            message
            status
        }
    }
`;

export const isLoggedIn = gql`
    query IsLoggedIn {
        isLoggedIn
    }
`;

export const adminLogout = gql`
    mutation AdminLogout {
        adminLogout {
            loggedOut
            message
        }
    }
`;