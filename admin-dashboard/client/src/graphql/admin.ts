import { gql } from "@apollo/client";

export const getPersonalInfo = gql`
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

export const updatePersonalInfo = gql`
    mutation UpdateAdminDetails($input: AdminUpdateInput!) {
        updateAdmin(input: $input) {
            name
            email
            dob
            phone
            country
        }
    }
`;

export const addPersonalInfo = gql`
    mutation CreateAdmin($input: AdminInput!) {
        createAdmin(input: $input) {
            name
            email
            hashedPassword
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